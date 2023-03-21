const mongoose = require("mongoose");
const validator=require('validator')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please tell us Your Name']
    },
    email:{
        type:String,
        require:[true,'Please Provide Your Email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provie a valid Email']
    },
    photo:String,
    password:{
        type:String,
        require:[true,'Please Provide Password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        require:[true,'Please Confirm your Password'],
        minlength:8
    },
})

const User=mongoose.model('User',userSchema)

  module.exports=User