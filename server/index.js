const express = require('express');
const path = require('path');
const auth = require('http-auth');
const md5 = require('md5');

const app = express();

// Setup basic auth
const basic = auth.basic({
  realm: "Hitnet"
}, (username, password, callback) => {
  callback(md5(username) === process.env.HITNET_UI_UN && md5(password) === process.env.HITNET_UI_PW);
});

if (process.env.NODE_ENV === 'production') {
  app.use(auth.connect(basic));
}

app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Starting server on port ${port}`);
