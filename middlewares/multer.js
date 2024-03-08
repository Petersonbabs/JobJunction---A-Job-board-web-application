const multer = require("multer");
const DataUri = require("datauri/parser");
const path = require("path");

// creating storage
const storage = multer.memoryStorage();

const upload = multer({storage: storage})

const duri = new DataUri()

const dataUri = (req)=>{
    
    duri.format( path.extname(req.file.originalname).toString(), req.file.buffer )
    console.log(req.file);
    return
}


module.exports = {upload, dataUri}