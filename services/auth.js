//stateless
const jwt = require("jsonwebtoken");
const secret = "mysecretkey";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role, // Include the user's role in the token payload
    },
    secret,
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    //console.log("JWT Error:", error.message);
    return null;
  }
}

module.exports = { setUser, getUser };

//statefull
//this is a simple diary of user sessions. Analogy- if a user logs in, we give them a diary and they write their name in it. Whenever they come back, we check the diary to see who they are. This is a very basic way to manage user sessions without using cookies or databases.
// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }
// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// module.exports = { setUser, getUser };
