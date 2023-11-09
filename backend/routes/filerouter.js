const express=require('express')
const router=express.Router()
const {UploadFile,getAllFiles,getSingleFile,getSplittedpdf,mergePdfs}=require('../controllers/filecontroller')
const userAuth=require('../middlewares/userAuth')
router.post('/',userAuth,UploadFile)
router.get('/getallfiles',userAuth,getAllFiles)
router.get('/getsinglepdf',userAuth,getSingleFile)
router.get('/mergepdfs',userAuth,mergePdfs)
router.get('/getsplittedpdf',userAuth,getSplittedpdf)

 module.exports=router