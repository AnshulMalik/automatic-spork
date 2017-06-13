/* jshint esversion:6 */
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
console.log(url);
class Client {
  constructor() {
    MongoClient.connect(url, (err, database) => {
      if (err) {
        throw err;
      }
      console.log('connected to database');
      this.db = database;
    });
  }
}

module.exports = new Client();
