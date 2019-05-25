var router = require('express').Router();
var User = require('../models/user');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.redirect('/login');
        } else {
          return res.render("profile", {
            user: user
          });
        }
      }
    });
});

module.exports = router;
