var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;

// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("wikit");
    var query = {
      username: req.params.request
    };
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.json({
          status: "success",
          value: true
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

module.exports = router;
