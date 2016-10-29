/* jshint esversion:6 */
var util = require("util");
var urlLib = require("url");
var requestPromise = require("request-promise");
function wrapper(token) {

  return function merge(repo, sha, message) {
    let url = urlLib.resolve("https://api.github.com/repos/" + repo.full_name + "/merges");
    requestPromise({
        method: "POST",
        uri: url.toString(),
        body: {
          "base": "master",
          "head": sha,
          "commit_message": message
        },
        json: true,
        headers: {
          "User-Agent": "Bot",
          "Authorization": "token " + token
        },
        resolveWithFullResponse: true
    }).then((response) => {
      let json = response.toJSON();
      switch(json.statusCode) {
        case 204:
          console.error("No content to display, something went wrong");
          break;
        case 201:
          console.log("Successfully merged.");
          break;
        case 409:
          console.log("Merge conflicts are present");
          break;
        case 404:
          console.log("Base branch or current head is not found");
          break;
        default:
          console.log("Invalid status code " , json.statusCode);
      }
    }).catch((err) => {
      console.log("errors occured: ");
      console.log(err.message);
    });
  };
}
module.exports = wrapper;
