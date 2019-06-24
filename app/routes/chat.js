var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
// GET route for reading data

router.get('/', function(req, res, next) {
  Promise.all([
    User.findById(req.session.userId)
  ]).then(([user]) => {
    return res.render("chat", {
      user: user
    });
  });
});
module.exports = router;
