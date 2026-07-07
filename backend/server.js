const express = require('express');
require('dotenv').config()
const bodyparser = require('body-parser')
console.log(process.env.MONGO_URI)
const port = 3000;
const { MongoClient } = require('mongodb');
var cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(cors());
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect();
// Database Name
const dbName = 'LockIN';


//Get all the passwords
app.get('/', async (req, res) => {
 
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//Save a password
app.post('/', async (req, res) => {
   const password= req.body;
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.insertOne(password);
  res.json({success: true, result: findResult});
});

//Delete a password
app.delete('/', async (req, res) => {
   const password= req.body;
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.deleteOne(password);
  res.json({success: true, result: findResult});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});