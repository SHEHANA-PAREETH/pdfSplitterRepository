const jwt = require('jsonwebtoken')

const userAuth=(req,res,next)=>{
 const bearerHeader=req.headers['authorization']
if(typeof bearerHeader!== 'undefined'){
   const bearer=bearerHeader.split(' ')
   const bearerToken=bearer[1]
   jwt.verify(bearerToken,process.env.JWT_KEY,(err,authData)=>{
      if(err)
      res.status(403).json({message:'unauthorized request'})
   else{
      //console.log(authData);
      next()
   }
   })
}
}
module.exports=userAuth