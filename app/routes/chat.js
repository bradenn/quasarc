var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
// GET route for reading data

router.get('/', function(req, res, next) {
  Promise.all([
    User.findById(req.session.userId),
    Text.find({})
  ]).then(([user, post]) => {
    return res.render("chat", {
      user: user,
      post: post
    });
  });
});
module.exports = router;
