var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
var Comment = require('../models/comment');
// GET route for reading data
router.get('/', function(req, res, next) {
  var userData;
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        Text.find({})
          .exec(function(error, post) {
            if (error) {
              return next(error);
            } else {
              var postComments = [];



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
