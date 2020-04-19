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
function makeTransfer(user, amount, to, description) {
  const { username, transfers } = user;
  user.money -= amount;
  transfers.push({ amount, date: Date.now(), description, to, balance: user.money });

  return user;
}

module.exports = {
  handleLogin,
  getUser,
  makeTransfer,
};
