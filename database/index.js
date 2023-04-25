const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect('mongodb://localhost:27017/test');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number
  name: String
  owner: String
  createdAt: Date
  updatedAt: Date
  html_url: String
  description: String

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => { // Pass in the object received from the controller
  let repoInstance = new Repo(repoData);
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // Return an instance of the newly created Repo. repoInstance.save();
  return repoInstance.save()
    // .then((savedData) => console.log('This is the saved data:' savedData))
}

module.exports.save = save;