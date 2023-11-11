const mongoose=require('mongoose')
 const express=require('express')
const users=require('../model/useSchema')

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
   },
   uploadedBy:{
    type:mongoose.Types.ObjectId,
    ref: users
   }
})

const uploadedfiles=mongoose.model('uploadedfiles',fileSchema)
module.exports=uploadedfiles