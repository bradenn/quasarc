var router = require('express').Router();
var User = require('../models/user');
var Posts = require('../models/textpost');
var nodemailer = require('nodemailer');
var env = require("../config/env.json");

// GET route for reading data
router.get('/', function(req, res, next) {

  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render("404", {
          user: user
        });
      }
    });
});


module.exports = router;
