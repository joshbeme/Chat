const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', function(req, res){
    res.send('Hello world')
});
//log in page
router.get('/login', function(req, res, next){

})

//logging in
router.post('/login', function(req, res, next){
   
if(req.body.email && req.body.password){
    console.log('yup');
    User.authenticate(req.body.email, req.body.password, function(error, users){
        if(!users || error){
            const err = new Error('User or password is invalid.');
            console.log('User or password is invalid.')
            err.status = 400
            return next(err)
        }
        else{
            req.session.userId = users._id;
            console.log('logged in')
            res.redirect('/')
        }
    })
}
else{
    console.log('nope');
    return next()
}
})

//register page
router.get('/register', function(req, res, next){

})

//registering
router.post('/register', function(req, res, next){
    const {email, password, userName} = req.body
    if (email && password && userName){
        const userData = {email, password, userName}
        User.create(userData, function(error, user){
            if(error){
                return next(error);
            }
            else{
                req.session.userId = user._id
                console.log('success')
                res.redirect('/')
            }
        })
    }
    else{
        const err = new Error('Missing field')
        err.status = 400
        next(err)
    }
})

router.get('/logout', function(req, res, next){
    if(req.session){
        req.session.destroy(function(error){
        if(error) next(error)
        else res.redirect('/login');
    })}
    else{
        res.json({
            message: "Already signed out"
        })
        res.redirect('/login')}
});
//friends list
router.get('/friends', function(req, res){
    User.findById({_id: req.session.userId})
})

//add friend
router.post('/friends')
router.get('/chat', function(req, res){
    User.findOne()
});

module.exports = router;