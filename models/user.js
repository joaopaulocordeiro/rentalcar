const mongoose = require('mongoose')
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        min: 5,
        max: 255
    },

    email:{
        type: String,
        required:true,
        unique:true,
        min: 8,
        max: 255,
    },
    password:{
        type: String,
        required: true,
        min:5,
        max: 1024
    },
    isAdm:{
        type:Boolean
    }
})

//JWT TOKEN
userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({id: this._id, isAdm:this.isAdm}, config.get('jwtPrivateKey'))
return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema ={
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(8).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user)
}

exports.validate = validateUser;
exports.User = User;