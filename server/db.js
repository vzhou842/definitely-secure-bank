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
    money: 20000,
    transfers: [],
  };
  sessions[sessionID] = username;

  return sessionID;
}

function getUser(sessionID) {
  return users[sessions[sessionID]];
}

// Returns the updated user, or false on failure.
function makeTransfer(user, amount, to, description) {
  if (user.money < amount) {
    return false;
  }
  const { username, transfers } = user;
  user.money -= amount;
  transfers.push({ amount, description, to, balance: user.money });

  return user;
}

module.exports = {
  handleLogin,
  getUser,
  makeTransfer,
};
