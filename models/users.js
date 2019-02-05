'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const friendSchema = new mongoose.Schema({
    type: Object
})

const UserSchema =  new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userName:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
      
    },
    friends: {
        type: Object,
        default: {}
    },
    requests:{
        type: Array, 
        default: []
    }
});



UserSchema.statics.authenticate = function(email, password, callback){
     User.findOne({email}).exec(function(error, user){
        if (error) callback(error)
        else if (!user){
            const err = new Error('User not found.')
            err.status = 401;
            return callback(err)
        }
        else{
            bcrypt.compare(password, user.password, function(error, result){
                console.log(result);
                if (result === true){
                    console.log('good')
                    return callback(null, user)
                }
                else{
                    console.log('bad')
                    return callback(error, null)
                }
            })
        }
    })
};

UserSchema.static('addFriend', function(from, to, callback){


})

UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) next(err)
        else{
            user.password = hash
            return next()
        }
    })
});



const User = mongoose.model('User', UserSchema);
module.exports = User;