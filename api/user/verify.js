var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;
router.get('/', function(req, res) {

});
// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  var jsono = JSON.parse(req.params.request);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("wikit");
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
});

function generateToken(jsonRequest){
  var token = genHash(64);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("wikit");
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
