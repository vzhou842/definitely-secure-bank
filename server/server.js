const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db');

const BUILD_PATH = path.join(__dirname, '../build');

const ONE_HOUR_MS = 1000 * 60 * 60;

const app = express();

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sessionID = db.handleLogin(username, password);
  res.cookie('session', sessionID, { maxAge: ONE_HOUR_MS }).redirect('/');
});

app.post('/transfer', (req, res) => {
  const { session } = req.cookies;
  const user = db.getUser(session);

  if (!user) {
    return res.status(401).end();
  }

  const { amount, description } = req.body;
  const intAmount = parseInt(amount);
  if (!Number.isInteger(intAmount) || description == null || description == '') {
    return res.status(400).end();
  }

  const updatedUser = db.makeTransfer(user, intAmount, description);
  res.status(200).json(updatedUser);
});

app.get('/user', (req, res) => {
  const { session } = req.cookies;
  const user = db.getUser(session);
  if (!user) {
    res.status(200).json(null);
  } else {
    res.status(200).json(user);
  }
});

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
