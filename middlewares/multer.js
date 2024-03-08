const multer = require("multer");
const Datauri = require('datauri/parser');
const path = require("path");

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const  dUri = new Datauri();

const dataUri = (req) => {
    return dUri.format( path.extname(req.file.originalname).toString(), req.file.buffer )
}

module.exports = { upload, dataUri };