var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');

// GET route for reading data

router.get('/', function(req, res, next) {
  Promise.all([
    User.findById(req.session.userId),
    Post.Text.find({})
  ]).then(([user, post]) => {
    return res.render("index", {
      user: user,
      post: post
    });
  });
});
module.exports = router;
