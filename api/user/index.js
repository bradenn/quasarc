var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;

// Insert user into database (Sign up)
router.post('/', function(req, res) {
  const neededKeys = ['username', 'password', 'email', 'key_id', 'token'];
  // Converting the request to JSON
  var request = req.body;

  // Confirm that the JSON request string satisfies all inputs
  var checkAuth = true;
  if (neededKeys.every(key => Object.keys(request).includes(key))) {
    // authenticaton check
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(env.database);
      var query = {
        key_id: request.key_id,
        token: request.token
      };
      dbo.collection("tokens").find(query).toArray(function(err, result) {
        if (err) throw err;
        let hash = crypto.createHash('sha1').update(request.password).digest("hex");
        if (result.length >= 1) {
          var myobj = {
            username: request.username,
            password: hash,
            email: request.email
          };
          dbo.collection("users").insertOne(myobj, function(err, reso) {
            if (err) throw err;
            res.json({
              status: 201,
              message: "User added to database."
            });

          });
        } else {
          res.json({
            status: 401,
            message: "authenticaton error"
          });
        }

        db.close();
      });
    });

  } else {
    res.json({
      status: 400,
      message: "inputs not satisfied"
    });
  }
});


// Check if user exists (Login)
router.get('/:body', function(req, res) {
  const neededKeys = ['username', 'password', 'key_id'];
  // Converting the request to JSON
  var jsono = JSON.parse(req.params.body);
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
          res.status(200).json({
            token: generateToken(jsono)
          });
        } else {
          res.status(204).json({
            error: "incorrect"
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
