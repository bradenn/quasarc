var router = require('express').Router();
var User = require('../models/user');
var Post = require('../models/textpost');

// GET route for reading data

router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if(user != null){
          var t = [];
          for(var i = 0; i < user.realms.length; i++){
            t.push(user.realms[i]._id);
          }
            Post.Text.find({'realm': { $in: t }}).populate("realm").populate("comments").sort({date: -1})
              .exec(function(error, post) {
                if (error) {
                  return next(error);
                } else {
                  return res.render("home", {
                    user: user,
                    post: post,
                    title: 'home'
                  });
                }
              });
        }else{
          return res.redirect("/login");
        }


      }
    });
});
module.exports = router;
