const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const uuid = require("uuid");
const Messages = require("../models/messages");

//gets chat id from friends username
router.param("cID", function(req, res, next, id) {
  User.findById(req.session.userId, function(err, chat) {
    if (err) return next(err);
    if (!chat) {
      const error = new Error("Chat session does not exist.");
      error.status = 404;
      return next(error);
    }
    req.chatId = chat.friends[id];
    return next();
  });
});

router.get("/", function(req, res) {
  res.send("Hello world");
});
//log in page
router.get("/login", function(req, res, next) {});

//logging in
router.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
    console.log("yup");
    User.authenticate(req.body.email, req.body.password, function(
      error,
      users
    ) {
      if (!users || error) {
        const err = new Error("User or password is invalid.");
        console.log("User or password is invalid.");
        err.status = 400;
        return next(err);
      } else {
        req.session.userId = users._id;
        console.log("logged in");
        res.redirect("/");
      }
    });
  } else {
    console.log("nope");
    return next();
  }
});

//register page
router.get("/register", function(req, res, next) {});

//registering
router.post("/register", function(req, res, next) {
  const { email, password, userName, confirm } = req.body;
  if (email && password && userName && confirm) {
    if(password === confirm){
    const userData = { email, password, userName };
    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        console.log("success");
        res.redirect("/");
      }
    });}
  } else {
    const err = new Error("Missing field");
    err.status = 400;
    next(err);
  };
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(error) {
      if (error) return next(error);
      else res.redirect("/login");
    });
  } else {
    res.json({
      message: "Already signed out"
    });
    res.redirect("/login");
  }
});

router.post('/search', (req, res, next)=>{
  let userName;
  const regexGenerator = (search) => {
    const regex = new RegExp('^'+search, 'gi')
    return regex;
  };

  User.find({userName: regexGenerator(req.body.userName)}, (error, seaches)=>{
    if(error)return next(error);
    else{
      res.json(seaches.userName)
    }
  }).limit(5)
})

router.get('/request', (req, res, next)=>{
  User.findById(req.session.userId, (error, requests)=>{
    if(error)return next(error)
    else{
      res.json(requests.requests)
    }
  })
})

router.post('/request', (req, res, next)=>{
  User.findOne({userName: req.body.userName}, (error, friend)=>{
    if(error)return next(error)
   
      User.findById(req.session.userId, (error, you)=>{
        const checker = (element) => {
          return element === you.userName
        }
        if(error) return error
        else{
          if(friend.requests.some(checker)){
            const err = new Error('User already requested')
            err.status = 400;
            next(err)
          }
          else{
          friend.requests.push(you.userName);
          friend.save((error, saveData)=>{
            if(error){
              const err = new Error('Friend did not get added')
              err.status = 400;
              next(err)
            }
            else{
              res.redirect('/request')
            }
          })}
        }
      })
  })
})

//friends list
router.get("/friends", function(req, res, next) {
  User.findById(req.session.userId, function(error, data) {
    if (error) return next(error);
    res.json(data.friends);
  });
});

router.get('/friends/:cID', (req, res, next)=>{
  res.json({chat: req.chatId})
})
//add friend
router.post("/friends", function(req, res, next) {
  const conversationId = uuid();
  User.findOne({ userName: req.body.userName }, function(error, friend) {
    if (error) return next(error);
    if (!friend) {
      const err = new Error("User not found.");
      err.status = 404;
      return next(err);
    } else {
      console.log(1);

      //username is key value is ID
      const friendData = {};
      friendData[friend.userName] = conversationId;

      //adding friend to list
      User.findById(req.session.userId, function(error, data) {
        console.log(2);

        if (error) return next(error)
        else if(data.friends[friend.userName]){
            const err = new Error('Friend already added.')
            err.status = 400;
           return next(err);
        }
        else {
          //creates message with connecting uuid
          Messages.create(messagesData, function(error, message) {
            if (error) next(error);
            console.log(message);
          });            
          //adds friend to your friends list
          data.friends[friend.userName] = conversationId;
          data.save(function(error, saveData) {
            console.log(3);

            if (error) return next(error);
            else {
              //adds you to friend's friends list
                friend.friends[data.userName] = conversationId;

                friend.save(function(error, save){
                    if (error)return next(error)
                    else{
                        res.json([save, saveData])
                    }
                })
            }
            
          });
        }
      });
    }
  });
  //creating conversation ID
  const messagesData = {
    conversationId,
    messages: []
  };

});

router.delete("/friends", function(req, res, next) {
  U;
});
router.get("/chat/:cID", function(req, res) {
  console.log(req.chatId);
  res.json(req.chatId);
});

module.exports = router;
