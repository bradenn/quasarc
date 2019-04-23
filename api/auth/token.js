var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var hash = require('crypto').createHash("sha1");

var env = require("../config/env.json");
var url = env.mongourl;

const neededKeys = ['key_id', 'key_pass'];

// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  var jsonRequest = JSON.parse(req.params.request);
  if (neededKeys.every(key => Object.keys(jsonRequest).includes(key))) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(env.database);
      var query = {
        key_id: jsonRequest.key_id,
        key_pass: jsonRequest.key_pass
      };
      dbo.collection("keys").find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
          // Key authenticated
          res.json({
            status: "success",
            token: generateToken(jsonRequest, res)
          });
        } else {
          res.json({
            status: "error",
            message: "authorization error"
          });
        }
        db.close();
      });
    });
  } else {
    res.json({
      status: "error",
      message: "inputs not satisfied"
    });
  }
});

function generateToken(jsonRequest, res){
  var token = genHash(64);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(env.database);
    var myobj = {
      key_id: jsonRequest.key_id,
      token: token
    };
    dbo.collection("tokens").insertOne(myobj, function(err, reso) {
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
