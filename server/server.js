const express = require('express');
const path = require('path');

const BUILD_PATH = path.join(__dirname, '../build');

const app = express();

app.use(express.static(BUILD_PATH));

const port = process.env.PORT || '8001';
app.listen(port);
console.log(`Server listening on port ${port}`);
