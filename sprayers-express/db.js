const { Db } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/sprayers';

let client = new MongoClient(url)
client.connect()

let db = new Db(client,"sprayers");
console.log("db is ready");

module.exports = db;