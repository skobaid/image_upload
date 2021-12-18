const express = require ("express");
const multer = require ("multer");
const ejs = require ("ejs");
const hbs = require("hbs");
const path =require("path");
const exp = require("constants");
const mongodb = require("mongodb");
const { config } = require("process");
const imageUpload = require("./src/models/upload");
const fs =require("fs");
require("./src/db/conn");
const port = process.env.PORT || 8000;

//init app
const app = express();
// const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:false})); //For Getting Data From Form


//hbs
//app.set("view engine","hbs");
// set the view engine to ejs
app.set('view engine', 'ejs');

//upload Folder
app.use(express.static("uploads"));


app.get("/index",(req,res)=>{
    
    res.render("index");
})
//==============multer code for image uploading====================//
    const Storage = multer.diskStorage({
        destination:"./uploads",
        filename:function(req,file,cb){
            cb(null,file.fieldname+ "_" + Date.now()+path.extname(file.originalname))
        }
    });

    const upload = multer({storage: Storage}).single("imageFile")   //we will send this upload as a argument in app.post
//======================================================================================================/
app.get("/Data",async(req,res)=>{

        try{
            const Student_Data= await imageUpload.find();
            res.send(Student_Data);
        }catch(ERR){res.render(ERR);}
    });
//========================================================================================================/
app.post("/index",upload,async(req,res,next)=>{
        try{
            //==========code for file uploading

            var fimg = req.file.filename;
            console.log(fimg);
            {
                const registerEmployee =await new imageUpload({
                    name: req.body.fname,
                    Desc : req.body.desc,
                    // img : 'http:// 192.168.1.22:3000/' + fimg
                   img :  fimg
                    
                    
                })
                console.log(registerEmployee);
            const registered =await  registerEmployee.save(function(err,doc){
                

            });
            res.render("index");
            
            // res.contentType(finalImage.contentType);
            // res.send(finalImage.image);
        }      
        }catch(error){res.status(400).send(error);}
        
     });

//=================================code for multiple File ==============================//
// app.post("/index",upload.array("imageFile",5),async(req,res,next)=>{
    
//     const files = req.files;
    
//     res.send(files);
    
//  });

//========================================================================================//
//Get Individual student Data Using ID  (By Using Name)
app.get("/",async(req,res)=>{

    try{
        const name = req.params.name;
        const studentData= await imageUpload.find();
        console.log(studentData);
      
         res.render("students",{records:studentData});
        
        
    }catch(e){res.status(500).send(e);}
});
//=============================        SHOW         ===============================================

app.get("/:id",async(req,res)=>{

    try{
        const name = req.params.name;
        const studentData= await imageUpload.findById(req.params.id)
        console.log(studentData);
      
         res.render("show",{records:studentData});
        
        
    }catch(e){res.status(500).send(e);}
});

//==================================  Autocomplete Search    =========================================//

app.get('/autocomplete/', function(req, res, next) {

    var regex= new RegExp(req.query["term"],'i');
   
    var employeeFilter =imageUpload.find({name:regex},{'name':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
    employeeFilter.exec(function(err,data){
  
  
  var result=[];
  if(!err){
     if(data && data.length && data.length>0){
       data.forEach(user=>{
         let obj={
           id:user._id,
           label: user.name
         };
         result.push(obj);
       });
  
     }
   
     res.jsonp(result);
  }
  
    });
  
  });


  //=======================================================

app.listen(port,()=>{
    console.log(`Server in Running At Port Number ${port}`);
})