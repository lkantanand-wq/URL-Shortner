const { getUser } = require("../services/auth");

//Authentucation- who are you?
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null; // Default to null, indicating no authenticated user
  if (!tokenCookie) {
    return next();
  }
  //now validate
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  next();
}

//Authorization- what can you do?
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/signup");
    }
    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }
    next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
