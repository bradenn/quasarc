var router = require('express').Router();
var User = require('../models/user');
var Text = require('../models/textpost');
var Chat = require('../models/chat');
var ChatMessage = require('../models/chatmessage');
// GET route for reading data

router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user != null) {
          Chat.findOne({
              _id: req.params.id
            })
            .exec(function(error, chat) {
              if (error) {
                return next(error);
              } else {
                if (chat != null) {
                  ChatMessage.find({
                      chat: chat._id
                    })
                    .exec(function(error, messages) {
                      if (error) {
                        return next(error);
                      } else {
                        return res.render("chat", {
                          user: user,
                          chat: chat,
                          messages: messages
                        });
                      }
                    });
                } else {

                }
              }
            });
        } else {
          res.redirect("login")
        }


      }
    });
});
module.exports = router;
