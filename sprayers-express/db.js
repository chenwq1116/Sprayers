const { Db } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://101.37.87.203:3000/sprayers';
const url = 'mongodb://47.113.231.205:27017/sprayers';

let client = new MongoClient(url)
client.connect()

let db = new Db(client,"sprayers");
// let db = new Db(client,"sprayers_dev");
console.log("db is ready");

module.exports = db;