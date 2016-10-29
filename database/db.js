/* jshint esversion:6 */
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
class Client {
  constructor() {
    MongoClient.connect(url, (err, database) => {
      if (err) {
        throw err;
      }
      this.db = database;
    });
  }
}

module.exports = new Client();
