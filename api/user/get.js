var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;


const neededKeys = ['user_id', 'key_id', 'user_token'];

// Handle all requests with inputs
router.post('/', function(req, res) {
  // Converting the request to JSON
  var request = req.body;
  console.log(req);
  // Confirm that the JSON request string satisfies all inputs
  if (neededKeys.every(key => Object.keys(request).includes(key))) {

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(env.database);
        var query = {
          token: request.user_token
        };

        dbo.collection("user_tokens").find(query).toArray(function(err, result) {
          if (err) throw err;
          if (result.length > 0) {
            res.json({
              status: "success",
              value: result[0].username
            });
          } else {
            res.json({
              status: "error",
              message: "user_id not found"
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

module.exports = router;
