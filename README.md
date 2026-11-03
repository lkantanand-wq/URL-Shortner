# Project-03: URL Shortener Service

A full-stack URL shortening application built with Node.js, Express, MongoDB, and EJS. Features user authentication, role-based access control, and a Discord Bot integration for creating short URLs directly from Discord.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Discord Bot](#discord-bot)
- [Project Structure Details](#project-structure-details)

## 🎯 Overview

Project-03 is a comprehensive URL shortening service that allows users to create short URLs from long ones, track visit history, and manage their URLs. It includes:

- User authentication and signup
- Role-based access control (NORMAL and ADMIN roles)
- URL shortening with unique short IDs
- Visit history tracking with timestamps
- Discord Bot integration for URL creation
- Web-based dashboard for URL management

## ✨ Features

- **User Authentication**: Secure signup and login system
- **Role-Based Access Control**: NORMAL and ADMIN user roles with different permissions
- **URL Shortening**: Convert long URLs to short, memorable identifiers
- **Visit Analytics**: Track the number of visits and timestamps for each shortened URL
- **User-Specific URLs**: Each user can manage their own shortened URLs
- **Discord Bot Integration**: Create short URLs directly from Discord commands
- **Responsive UI**: EJS-based templates for web interface
- **Cookie-Based Sessions**: Persistent user sessions using cookies

## 🗂️ Project Structure

```
Project-03/
├── controllers/          # Business logic for routes
│   ├── url.js           # URL shortening and analytics logic
│   └── user.js          # User management logic
├── models/              # MongoDB schemas
│   ├── url.js           # URL model
│   └── user.js          # User model
├── routes/              # API routes
│   ├── url.js           # URL routes
│   ├── user.js          # User authentication routes
│   └── staticRouter.js   # Static/public routes
├── middlewares/         # Custom middleware
│   └── auth.js          # Authentication and authorization
├── services/            # Business services
│   └── auth.js          # Authentication service
├── views/               # EJS templates
│   ├── home.ejs         # Dashboard
│   ├── login.ejs        # Login page
│   └── signup.ejs       # Signup page
├── Discord Bot/         # Discord Bot integration
│   ├── index.js         # Bot entry point
│   ├── command.js       # Command definitions
│   └── package.json     # Bot dependencies
├── index.js             # Main application entry point
├── connect.js           # MongoDB connection
└── package.json         # Project dependencies
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Authentication**: Cookie-based sessions
- **ID Generation**: nanoid (for short URL IDs)
- **Discord Integration**: discord.js
- **Server Utility**: nodemon (for development)

### Key Dependencies

- `express` - Web server framework
- `mongoose` - MongoDB object modeling
- `ejs` - Template engine
- `cookie-parser` - Cookie middleware
- `body-parser` - Request parsing middleware
- `discord.js` - Discord Bot API
- `nanoid` - Unique ID generator

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn package manager

### Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd Project-03
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Discord Bot dependencies (optional):**
   ```bash
   cd "Discord Bot"
   npm install
   cd ..
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (if needed):

```
MONGODB_URI=mongodb://localhost:27017/project-03
PORT=3000
DISCORD_TOKEN=your_discord_bot_token_here
```

### MongoDB Connection

The application connects to MongoDB at `mongodb://localhost:27017/project-03` by default. Update the connection string in `index.js` or `Discord Bot/index.js` if using a different MongoDB instance.

## 🚀 Usage

### Start the Main Server

```bash
npm start
```

The server will start on `http://localhost:3000`. Nodemon will automatically restart on file changes.

### Start the Discord Bot

```bash
cd "Discord Bot"
node index.js
```

## 🔌 API Endpoints

### Authentication Routes (`/user`)

- `POST /user/signup` - Create a new user account
- `POST /user/login` - Login to existing account
- `GET /user/logout` - Logout current user

### URL Routes (`/url`)

- `POST /url` - Create a new short URL
  - **Requires**: Authentication
  - **Body**: `{ url: "https://example.com/long-url" }`
  - **Response**: Renders home page with short URL

- `GET /url/:shortID/analytics` - Get visit analytics for a short URL
  - **Response**: `{ analytics: number_of_visits }`

### Redirect Routes

- `GET /:shortID` - Redirect to original URL
  - Automatically tracks visit in history
  - Returns 404 if short URL not found

### Static Routes

- `GET /` - Home page (dashboard)
- `GET /signup` - Signup page
- `GET /login` - Login page
- `GET /test` - Test endpoint showing all URLs

## 🤖 Discord Bot

The Discord Bot allows users to create short URLs directly from Discord.

### Discord Bot Features

- **Command**: `create <url>` - Create a new short URL
  - **Usage**: `create https://example.com/very/long/url`
  - **Response**: Replies with the shortened URL

### Discord Bot Setup

1. Create a Discord Bot on [Discord Developer Portal](https://discord.com/developers/applications)
2. Get your bot token
3. Update the token in `Discord Bot/index.js`
4. Invite the bot to your Discord server
5. Ensure the bot has message read permissions

### Example Discord Commands

```
user: create https://github.com/user/repository/issues?tab=open
bot: Short URL created: http://localhost:3000/abc123
```

## 📊 Data Models

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  role: String (default: "NORMAL"),
  password: String (required),
  timestamps: { createdAt, updatedAt }
}
```

### URL Schema

```javascript
{
  shortID: String (required, unique),
  redirectUrl: String (required),
  visitHistory: [{ timeStamps: Number }],
  createdBy: ObjectId (reference to User),
  timestamps: { createdAt, updatedAt }
}
```

## 🔐 Role-Based Access Control

- **NORMAL Role**: Can create and manage their own short URLs
- **ADMIN Role**: Has elevated permissions for managing system resources

## 📝 Views

### home.ejs
Dashboard displaying user's shortened URLs and their analytics.

### login.ejs
Login form for user authentication.

### signup.ejs
Registration form for new user accounts.

## 🔧 Middleware

### Authentication Middleware (`middlewares/auth.js`)

- `checkForAuthentication`: Verifies user authentication on every request
- `restrictTo(roles)`: Role-based access control middleware

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update the connection string
- Verify the database name matches in the connection URL

### Discord Bot Not Responding
- Verify the bot token is correct
- Check bot permissions in Discord server
- Ensure the bot has the `MessageContent` intent enabled

### Port Already in Use
- Change the port in `index.js` (currently 3000)
- Or kill the process using the port

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Discord.js Documentation](https://discord.js.org/)
- [EJS Documentation](https://ejs.co/)

## 📄 IMPORTANT FOR SOME GREAT MINDS
   I KNOW KEYS ARE EXPOSED BUT I DONE THEM INTENTIONALLY BCOZ IT'S NOT A PRODUCTION GRADE OR A VERY GREAT PROJECT IT'S A BASIC URL SHORTNER SYSYTEM. BUT WHY- IF        ANYONE DON'T KNOW AND DON'T HAVE KNOWLEDGE THEY CAN SEE AND UNDERSTAND OR EVEN CLONE SAME REPO IN THEIR SYSYTEM.

---

**Author**: Development Project  
**Version**: 1.0.0  
**Last Updated**: 2024
"# URL-Shortner" 
