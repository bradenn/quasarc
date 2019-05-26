var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.use('/', require('./home.js'));
router.use('/login', require('./login.js'));
router.use('/new', require('./new.js'));
router.use('/profile', require('./profile.js'));
router.use('/p', require('./post.js'));
router.use('/like', require('./like.js'));

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});



module.exports = router;
