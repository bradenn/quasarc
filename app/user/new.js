var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;
const crypto = require('crypto')


const neededKeys = ['username', 'password', 'email', 'key_id', 'token'];

// Handle all requests with inputs
router.get('/:request', function(req, res) {
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
              status: "success",
              message: "user added"
            });

          });
        } else {
          res.json({
            status: "error",
            message: "authenticaton error"
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

function checkAuthentication(request) {

}

module.exports = router;
