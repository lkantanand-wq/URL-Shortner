const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const URL = require("../models/url");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const allUrls = await URL.find({});
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("signup", {
      error: error.message || "Registration failed. Please try again.",
    });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.redirect("/login");
    }
    //stateful
    // const sessionId = uuidv4();
    // setUser(sessionId, user);

    //stateless
    const token = setUser(user);

    //for authnetication. use below line if you want to use token based authentication and comment the cookie based authentication lines
    //return res.json({ token });
    
    //if you want to use cookie based authentication then uncomment below lines and comment the above line
    res.cookie("token", token, { 
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: '/'
    });
    return res.redirect("/");
  } catch (error) {
    //console.error("Login error:", error);
    return res.redirect("/login?error=Server error");
  }
}

module.exports = { handleUserSignup, handleUserLogin };
