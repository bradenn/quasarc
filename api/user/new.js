var router = require('express').Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// TODO: Fix whatever the hell this is...
var env = require("../config/env.json");
var url = env.mongourl;

// Handle all requests with inputs
router.get('/:request', function(req, res) {
  // Converting the request to JSON
  var jsonRequest = JSON.parse(req.params.request);
  newUser(jsonRequest, res);
});


// TODO: Clean up the spagetti :)
function newUser(request, res) {
  // Confirm that the JSON request string satisfies all inputs
  // TODO: make this check more efficient
  if (request.hasOwnProperty("username") &&
    request.hasOwnProperty("password") && request.hasOwnProperty("email") &&
    request.hasOwnProperty("birthdate")) {
    // Connect to the Mondgo DB only if needed.
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("wikit");
      var myobj = {
        username: request.username,
        password: request.password,
        email: request.email,
        birthdate: request.birthday
      };
      dbo.collection("users").insertOne(myobj, function(err, reso) {
        if (err) throw err;
        res.json({
          status: "success", message: "user added"
        });
        db.close();
      });
    });
  } else {
    res.json({
      status: "error", message: "inputs not satisfied"
    });
  }

}

module.exports = router;
