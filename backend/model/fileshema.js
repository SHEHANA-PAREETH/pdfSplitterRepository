const mongoose=require('mongoose')
 const express=require('express')


 const fileSchema= mongoose.Schema({
    title:
    {
        type:String,
        required:true,
    },
    pdf:{},
   splitted:{
    type:Boolean,
    default:false
   },
   newpdfs:{
    type:Number
   }
})

const uploadedfiles=mongoose.model('uploadedfiles',fileSchema)
module.exports=uploadedfiles