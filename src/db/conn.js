const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/imageUpload").then(()=>{
    console.log("Connection is Successful.......!");
}).catch((error)=>{
    console.log("No Connection", error);
})