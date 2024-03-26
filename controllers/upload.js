const { dataUri } = require("../middlewares/multer");
const { uploader } = require("../middlewares/cloudinary");

const uploadImage = async (req, res, next) => {

    

    try {

        
        
        if (!req.file) {
            console.log("No file received");
            next()
        } else {
            
            const file = dataUri(req).content;
            
            const result = await uploader.upload(file, {
                folder: "jobjunction/featuredImages"
            })
            
            

            req.body.featuredImg = result.secure_url
            next()


        }




    } catch (error) {
        console.log(error)
        next(error)
    }


};


const uploadFile = async (req, res, next) => {
    try {

        
        
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });
            
        } else {
            
            const file = dataUri(req).content;
            
            const result = await uploader.upload(file, {
                folder: "jobjunction/resumes"
            })
            console.log(result)
            

            req.body.resume = result.secure_url
            next()


        }




    } catch (error) {
        console.log(error)
        next(error)
    }


};

const uploadResume = async (req, res, next) => {
    try {

        if (!req.file) {
            res.status(404).json({
                status: 404,
                message: "No file was recieved."
            })

            return
        } else {
            const file = dataUri(req).content;
            const resume = await uploader.upload(file, { folder: "jobjunction/resumes" })

            req.resume =
                next()
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports = { uploadFile, uploadResume, uploadImage }