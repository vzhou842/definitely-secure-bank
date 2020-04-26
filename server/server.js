const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db');

const BUILD_PATH = path.join(__dirname, '../build');

const ONE_HOUR_MS = 1000 * 60 * 60;
const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;

const app = express();

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
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

app.get('*', (req, res) => {
  res.redirect('/');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null || username.length < 1 || password.length < 1) {
    return res.status(400).end();
  }
  const sessionID = db.handleLogin(username, password);
  res.cookie('session', sessionID, { maxAge: ONE_HOUR_MS }).redirect('/');
});

// Auth middleware
// Everything below this will require auth
app.use((req, res, next) => {
  const { session } = req.cookies;
  const user = db.getUser(session);

  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  return next();
});

app.post('/transfer', (req, res) => {
  const { amount, description, to, date } = req.body;
  const floatAmount = parseFloat(amount);

  if (
    isNaN(floatAmount) ||
    floatAmount <= 0 ||
    description == null ||
    description == '' ||
    to == null ||
    to == ''
  ) {
    return res.status(400).end();
  }

  const updatedUser = db.makeTransfer(req.user, floatAmount, to, description);
  if (updatedUser === false) {
    return res.status(401).json({ error: "You don't have enough balance.", success: false });
  }
  res.status(200).json({ user: updatedUser, success: true });
});

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
