/* jshint esversion:6 */
var DBClient = require("./db");

function closed(prID) {
  return new Promise((resolve, reject) => {
    DBClient.db.collection("open").delete({
      id: prID
    }, (err, result) => {
      if(err)
        reject("Something went wrong with the database");
      else
        resolve("Successfully closed");
    });
  });
}

function edited(pr) {
  return new Promise((resolve, reject) => {

    DBClient.db.collection("open").update({id: pr.id}, pr, (err, result) => {
      if(err)
        reject("Something went wrong with the database");
      else
        resolve("Successfully edited the pull request");
    });
  });
}

function labeled(prID, label) {
  return new Promise((resolve, reject) => {
    DBClient.db.collection("label").insertOne({
      prID,
      label
    }, (err, result) => {
      if(err)
        reject("Something went wrong with the database");
      else
        resolve("Label applied successfully");
    });
  });
}

function opened(pr) {
  return new Promise((resolve, reject) => {
    DBClient.db.collection("open").insertOne(pr, (err , result) => {
      if(err) {
        reject("Something went wrong with the database");
      }
      else {
        resolve("Successfully inserted into database");
      }
    });
  });
}

module.exports = {
  pullRequestClosed: closed,
  pullRequestEdited: edited,
  pullRequestLabeled: labeled,
  pullRequestOpen: opened,
};
