var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');

// GET route for reading data

router.get('/', function(req, res, next) {
  User.findById(req.session.userId).populate("realms")
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {

          Post.Text.find({}).populate("realm").populate("comments")
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
