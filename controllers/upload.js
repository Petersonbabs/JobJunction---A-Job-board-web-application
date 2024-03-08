const { dataUri, upload } = require("../middlewares/multer");
const { cloudinaryConfig, uploader } = require("../middlewares/cloudinary");



const uploadFile = async (req, res, next) => {


    console.log(req.body);

    try {

        if (!req.file) {
            res.status(404).json({
                status: 404,
                message: "No file was recieved."
            })
 
            return
        } else {
            const file = dataUri(req);
            const resume = await uploader.upload(file, { folder: "/jobjunction/resumes" })
            res.status(200).json({
                status: "success",
                message: "Resume uploader successfully",

                resume
            })
        }

    } catch (error) {
        console.log(error);
        next(error);
    }


}

module.exports = uploadFile