const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const cookieParser = require('cookie-parser');
const {checkForAuthentication, restrictTo} = require('./middlewares/auth');

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const port = 3000;
const app = express();
connectToMongoDB("mongodb://localhost:27017/project-03").then(() => {
  console.log("MongoDB Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
app.use(checkForAuthentication); // Middleware to check for authentication on every request

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls, user: req.user });
});
// Route handler for GET requests with a shortID parameter

app.use("/", staticRoute);
//app.use("/url", restrictToLoggedInUsersOnly, urlRoute);      //old way of restricting to logged in users only without role based access control
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);

// Route handler for GET requests with a shortID parameter
app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        { shortID },
        { $push: { visitHistory: { timeStamps: Date.now() } } }
    );
    
    if (!entry) return res.status(404).send("URL Not Found");
    
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
