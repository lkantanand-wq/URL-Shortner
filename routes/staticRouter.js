const express = require("express");
const URL = require("../models/url");
const router = express.Router();
const { restrictTo } = require("../middlewares/auth");

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
  const allUrls = await URL.find();
  return res.render("home", { urls: allUrls });
});

//router.get("/", restrictToLoggedInUsersOnly, async (req, res) => {    //old way of restricting to logged in users only without role based access control
  router.get("/", restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls, user: req.user });
});

router.get("/signup", (req, res) => {
  const error = req.query.error || null;
  return res.render("signup", { error });
});
 
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  return res.render("login", { error });
});

module.exports = router;
