const express = require('express');
const morgan = require('morgan');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save, getTop } = require('../database/index.js');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
app.use(express.static('client/dist'))
app.use(express.json());
app.use(morgan('dev'));
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  let requestedUsername = req.body.term;
  getReposByUsername(requestedUsername)
  .then((repos) => {
    let currentData = repos.data;
    let databaseResponses = currentData.map((repo) => {
      let params = {_id: repo.id, name: repo.name, owner: repo.owner.login, createdAt: repo.created_at, updatedAt: repo.updated_at, html_url: repo.html_url, description: repo.description}
      return save(params)
    })
    return Promise.all(databaseResponses)
  })
  .then((dbres) => {
    res.send()
  })
  .catch((error) => {
    res.send(error);
  })
  // .then((repos) => {
  //   let currentData = repos.data;
  //   for (var i = 0; i < currentData.length; i++) {
  //     let params = {repoid: repo.id, name: repo.name, owner: repo.owner.login, createdAt: repo.created_at, updatedAt: repo.updated_at, html_url: repo.html_url, description: repo.description}
  //     save(params)
  //     .then((result) => {
  //       console.log('This is result added to database:', result)
  //     })
  //     .catch((err) => {
  //       console.log('Did not add to database:', err)
  //     })
  //   }
  // })
  // Model.create();

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  return getTop()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    res.send(500, 'Error retrieving')
  })

  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

