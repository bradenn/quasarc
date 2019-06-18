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
        return res.render("login", {
          user: user
        });
      }
    });
});

//POST route for updating data
router.post('/', function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    let r = Math.random().toString(36).substring(7);

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      code: r
    }



    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;

        return res.redirect('/');
      }
    });

  } else if (req.body.loguser && req.body.logpassword) {
    User.authenticate(req.body.loguser, req.body.logpassword, function(error, user) {
      if (error || !user) {
        User.findById(req.session.userId)
          .exec(function(error, user) {
            if (error) {
              return next(error);
            } else {
              return res.render("login", {
                user: user,
                error: {
                  type: "login",
                  message: "Incorrect username or password"
                }
              });
            }
          });
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    User.findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        } else {
          return res.render("login", {
            user: user,
            error: {
              type: "register",
              message: "All fields must be complete"
            }
          });
        }
      });
  }
})

module.exports = router;
