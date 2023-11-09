const express=require('express')
const router=express.Router()
const userAuth=require('../middlewares/userAuth')
const {doSignup,userLogin}=require('../controllers/authcontrollers')
router.post('/register',doSignup)
router.post('/login',userLogin)


module.exports=router