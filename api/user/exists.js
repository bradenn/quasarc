var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;

// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  //var jsonRequest = JSON.parse(req.params.request);
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("wikit");
  dbo.collection("user").findOne({}, function(err, result) {
    if (err) throw err;
    res.json({ result: result });
    db.close();
  });
});
});

module.exports = router;
