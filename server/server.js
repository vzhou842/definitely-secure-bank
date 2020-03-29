const express = require('express');
const path = require('path');
const db = require('./db');

const BUILD_PATH = path.join(__dirname, '../build');

const ONE_HOUR_MS = 1000 * 60 * 60;

const app = express();

app.use(express.static(BUILD_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sessionID = db.handleLogin(username, password);
  res.status(200).cookie('session', sessionID, { maxAge: ONE_HOUR_MS }).end();
});

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
