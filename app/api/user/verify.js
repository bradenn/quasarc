var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;

const neededKeys = ['username', 'password', 'key_id'];

// Handle all requests with inputs
router.post('/', function(req, res) {
  // Converting the request to JSON
  var jsono = req.body;
  if (neededKeys.every(key => Object.keys(jsono).includes(key))) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(env.database);
      let hash = crypto.createHash('sha1').update(jsono.password).digest("hex");
      var query = {
        username: jsono.username,
        password: hash
      };
      dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.json({
            status: "success",
            value: true,
            token: generateToken(jsono)
          });
        } else {
          res.json({
            status: "success",
            value: false
          });
        }
        db.close();
      });
    });
  }
});

function generateToken(jsonRequest) {
  var token = genHash(64);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(env.database);
    var myobj = {
      username: jsonRequest.username,
      token: token
    };
    dbo.collection("user_tokens").insertOne(myobj, function(err, reso) {
      if (err) throw err;
      db.close();
    });
  });
  return token;
}

function genHash(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_=+!.,-";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = router;
