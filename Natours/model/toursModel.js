const mongoose = require("mongoose");
const tourSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'Tour Must have Name'],
      unique:true
    },
    ratings:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'Tour Must have Price']
    }
  })
  
  const Tour=mongoose.model('Tours',tourSchema)

  module.exports=Tour