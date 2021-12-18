//............In this File we will Create Models/Tables/documnets for database studentapi..................//
const mongoose = require("mongoose");
const validator = require("validator");  //For Validation

const uploadSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,         
        },
       
        Desc:
        {
            type:String,
                
        },
        img:
        {
            
            type: String
        }
        
    }
)

//WE WILL CREATE A NEW COLLECTION(TABLE)

const imageUpload = new mongoose.model("Upload",uploadSchema);

module.exports =imageUpload;