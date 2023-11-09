const express=require('express')
const multer=require('multer')
const UPLOADTODB=require('../model/fileshema')
const fsp = require('fs/promises');
 const path = require('path');

const UploadFile=(req,res)=>{
 try{
  const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,files,cb)=>{
        cb(null,Date.now()+"-"+files.originalname)
    }
})
var upload = multer({ storage: fileStorage }).single("file");
upload(req,res,(err)=>{
  //  console.log(req.file);
   // console.log(req.body.title);
    UPLOADTODB({
        title:req.body.title,
        pdf:req.file,
    }).save().then((resp)=>{
        console.log(resp);
        res.json({status:'ok'})
    })
       
    })

 }
    
  catch (error){
    console.log(error);
  }
  
   
}
const getAllFiles=(req,res)=>{

 try{
  UPLOADTODB.find({}).then((resp)=>
  res.json({msg:'success',data:resp}))
 }
 catch(error){
  console.log(error);
 }
   
  
 
   
}
const fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;


const getSingleFile=(req,res)=>{
   
        
          try{
// 👇️ if you use CommonJS require()
// const fsp = require('fs/promises');
// const path = require('path');

async function deleteAllFilesInDir(dirPath) {
  try {
    const files = await fsp.readdir(dirPath);
console.log(files);
    const deleteFilePromises = files.map(file =>
      fsp.unlink(path.join(dirPath, file)),
    );

    await Promise.all(deleteFilePromises);
  } catch (err) {
    console.log(err);
  }
}

deleteAllFilesInDir('./public/merges').then(() => {
  console.log('Removed all files from the specified directory');
  console.log(req.query.id);
  UPLOADTODB.findOne({_id:req.query.id}).then((resp)=>{
      
      console.log(resp);
      const filename=resp.pdf.filename
      console.log(filename);
      //to split the pdf
      if(resp.splitted===false){
          async function splitPdf(pathToPdf) {

              const docmentAsBytes = await fs.promises.readFile(pathToPdf);
          
              // Load your PDFDocument
              const pdfDoc = await PDFDocument.load(docmentAsBytes)
          
              var numberOfPages = pdfDoc.getPages().length;
          console.log( numberOfPages);
        await  UPLOADTODB.findOneAndUpdate({_id:req.query.id},{$set:{splitted:true,newpdfs:numberOfPages}},{new:true}).then((resp)=>{
              console.log(resp);
             
          })
              
      }
          
          (async () => {
              await splitPdf(`public/uploads/${resp.pdf.filename}`);
          })()
          
        
      }
      
      res.json({msg:'success',data:resp})
  })
});

          }   
          catch(error){
            console.log(error);
          }      
}          



const PDFMerger = require('pdf-merger-js');


const mergePdfs =  (req,res)=>{
   
      try {
        var merger = new PDFMerger();
          console.log(req.query.id);
          console.log(req.query.desiredpages);
         
          UPLOADTODB.findOne({_id:req.query.id}).then((resp)=>{
                  const intpagevalues=[]
                  
                 
               console.log(resp);
               console.log(resp.newpdfs);
               let newpages=req.query.desiredpages.split(',')
              const ranges= newpages.filter((value)=>{
                return value.includes('-')
                
               })
               const rangeswithcomma=[]
              newpages.forEach((value)=>{
              if(!value.includes('-'))
                rangeswithcomma.push(value)
               })
               console.log(ranges);
               console.log(rangeswithcomma);
               
               rangeswithcomma.forEach((value)=>{
                intpagevalues.push(parseInt(value))
                })
                const rangesnew=[]
                ranges.forEach((value)=>{
                    rangesnew.push(value.split('-'));
            
                    })
                   console.log(rangesnew);
                   
               rangesnew.forEach((value)=>{
                for(i=parseInt(value[0]);i<=parseInt(value[1]);i++){
                   intpagevalues.push(parseInt(i))
                }
               })
                //console.log(newpages);
               console.log(intpagevalues);
            
              const result= intpagevalues.every((value)=>{
               return  value<=resp.newpdfs
                })
                console.log(result);
              
            //console.log(intpagevalues.length,'length');
            
               if(result){
  
                (async ( )=>{
                      for(i=0;i<intpagevalues.length;i++){
                       await   merger.add(`public/uploads/${resp.pdf.filename}`,intpagevalues[i]);    
                      }
                     
                          let d= new Date().getTime()
                      await merger.save(`public/merges/${d}-${resp.pdf.originalname}`);
    //save under given name and reset the internal document
                  
                    const pdfmergedname=`${d}-${resp.pdf.originalname}`
                  const docmentAsBytes = await fs.promises.readFile(`public/merges/${d}-${resp.pdf.originalname}`);
            
                // Load your PDFDocument
                const pdfDoc = await PDFDocument.load(docmentAsBytes)
            
                var numberOfPages = pdfDoc.getPages().length;
            console.log(intpagevalues.length);
           
           console.log(numberOfPages);
          
                    console.log(pdfmergedname,'name');
                   
                    res.json({msg:'success',name:pdfmergedname})
             
                   })()
                  
                  }
                   else{
                      res.json({msg:"enter valid page numbers"})
                  }
                 
                
              }  ) 
  
          }
     
        catch (error) {
          console.log(error);
        }
   
    }

    const getSplittedpdf= async(req,res)=>{
      try{
        const files = await fsp.readdir('public/merges');
        console.log(files);
        res.download(files[0])
      }
        
    catch(error){
      console.log(error);
    }
    }

module.exports={UploadFile,getAllFiles,getSingleFile,mergePdfs,getSplittedpdf}