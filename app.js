/* jshint esversion:6 */
var app = require('express')();
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var DataStore = require('./database/datastore');

var merge = require('./merge')(process.env.GITHUB_TOKEN);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.write("<center>Bot is running</center>");
  res.end();
});

app.post('/', function(req, res) {
  // If request came from github
  if(req.body.action) {
    switch(req.body.action) {
      case 'opened':
        DataStore.pullRequestOpen(req.body.pull_request)
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.error(err);
          });
        break;
      case 'assigned':
        break;
      case 'unassigned':
        break;
      case 'labeled':
        DataStore.pullRequestLabeled(req.body.pull_request.id, req.body.label.name)
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err);
          });
        break;
      case 'unlabeled':
        break;
      case 'edited':
        if(req.body.pull_request.status == 'open') {
          DataStore.pullRequestEdited(req.body.pull_request)
            .then((result) => {
              console.log(result);
            }).catch((err) => {
              console.log(err);
            });
        }
        break;
      case 'reopened':
        break;
      case 'closed':
      DataStore.pullRequestClosed(req.body.pull_request.id)
        .then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
        break;
    }
  }

  // If request came from travis
  if(req.body.state) {
    // If travis ci build is currently running
    switch(req.body.state) {
      case 'pending':
        console.log("Build is pending.", req.body.id);
        break;
      case 'success':
        // merge the commit to master branch
        console.log("Build " + req.body.id + " succeeded, now merging....");
        let commit = req.body.commit;
        merge(req.body.repository, commit.sha, commit.commit.message);
        break;
      case 'failure':
        console.log("Build is failed.", req.body.id);
        break;
      default:
        // Do appropriate action
        console.log("Invalid state received : ", req.body.state);
    }
  }
  res.end("Thanks");
});

module.exports = app;
