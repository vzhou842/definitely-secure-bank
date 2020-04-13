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
    username,
    money: 1000,
    transfers: [],
  };
  sessions[sessionID] = username;

  return sessionID;
}

function getUser(sessionID) {
  return users[sessions[sessionID]];
}

// Returns the updated user
function makeTransfer(user, amount, to, description, date) {
  const { username, transfers } = user;
  transfers.push({ amount, date, description, to });
  user.money += amount;

  return user;
}

module.exports = {
  handleLogin,
  getUser,
  makeTransfer,
};
