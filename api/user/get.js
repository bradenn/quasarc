var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;
const crypto = require('crypto')


const neededKeys = ['user_token', 'key_id', 'token'];

// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  var request = JSON.parse(req.params.request);
  // Confirm that the JSON request string satisfies all inputs
  if (neededKeys.every(key => Object.keys(request).includes(key))) {

    // EXTREME SECURITY ISSUES
    if (false) {

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(env.database);
        var query = {
          token: request.user_token
        };
        dbo.collection("user_tokens").find(query).toArray(function(err, result) {
          if (err) throw err;
          if (result.length > 0) {
            var query2 = {
              username: result[0].username
            };
            dbo.collection("users").find(query2).toArray(function(err, results) {
              if (err) throw err;
              if (results.length > 0) {

                res.json({
                  status: "success",
                  value: results[0]
                });

              } else {
                res.json({
                  status: "error",
                  value: "username not found"
                });
              }
              db.close();
            });
          } else {
            res.json({
              status: "error",
              message: "token not found"
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
  }
});

function checkAuthentication(request) {

}

module.exports = router;
