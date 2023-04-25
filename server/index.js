const express = require('express');
const morgan = require('morgan');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
app.use(express.static('client/dist'))
app.use(express.json());
app.use(morgan('dev'));
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  let requestedUsername = req.body.term;
  console.log('THIS IS REQ.BODY:', req.body)
  getReposByUsername(requestedUsername)
  .then()

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

