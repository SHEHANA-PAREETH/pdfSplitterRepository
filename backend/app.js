const express=require('express')
const path=require("path")
const connectDB=require('./config/dbconfig')
const fileRouter=require('./routes/filerouter')

const authRouter=require('./routes/authrouter')
const cors=require('cors')
const app=express()
require('dotenv').config()

app.use(express.static(path.join(__dirname,"public")))
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
     origin: '*',
     credentials:true,
     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
   }
app.use(cors(corsOptions))
app.listen(process.env.PORT || 3001,
     ()=>console.log('server running'));
    
 app.use('/',fileRouter)
     
 app.use('/auth',authRouter)  