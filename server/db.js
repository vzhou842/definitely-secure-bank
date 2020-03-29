// We're just going to fake having a db and store everything in memory :)
// This also gives us the benefit of everything happening synchronously!
const shortid = require('shortid');

// username -> user
const users = {};

// session ID -> username
const sessions = {};

// Returns the session ID
function handleLogin(username, password) {
  const sessionID = shortid();

  users[username] = {
    money: 1000,
  };
  sessions[sessionID] = username;

  return sessionID;
}

module.exports = {
  handleLogin,
};
