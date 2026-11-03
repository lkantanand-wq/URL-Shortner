const { getUser } = require("../services/auth");
async function restrictToLoggedInUsersOnly(req, res, next) {
  // For cookie based authentication, uncomment below line and comment the token based authentication line
  //const userUid = req.cookies?.uid;

  //for token based authentication, uncomment below line and comment the cookie based authentication line
  const userUid = req.headers?.["authorization"];

  if (!userUid) {
    return res.redirect("/login");
  }
  //below line is for token based authentication, comment it if you are using cookie based authentication
  const token = userUid.split("Bearer ")[1];

  const user = getUser(token);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // For cookie based authentication, uncomment below line and comment the token based authentication line
  //   const userUid = req.cookies?.uid;
  //   const user = getUser(userUid);

  //for token based authentication, uncomment below line and comment the cookie based authentication line
  const userUid = req.headers?.["authorization"];
  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUsersOnly,
  checkAuth,
};
