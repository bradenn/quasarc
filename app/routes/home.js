var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
// GET route for reading data
router.get('/', function(req, res, next) {
  var userData;
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        Text.find({
            user: "bradencn"
          })
          .exec(function(error, post) {
            if (error) {
              return next(error);
            } else {
              return res.render("index", {
                user: user,
                post: post
              });
            }
          });
      }
    });
});

module.exports = router;
