const Applications = require("../models/application");
const Jobs = require("../models/job");
const fetchData = require("../middlewares/fetching");

// Create Application (employee only)
const createApplication = async (req, res, next) => {

    const { applicationStatus, message, resume } = req.body

    try { 


        const { company } = await Jobs.findById(req.params.id)

        const application = await Applications.create({ candidate: req.user.id, applicationStatus, job: req.params.id, message, company, resume: resume.secure_url })

        if (!application) {
            res.status(404).json({
                status: "failed",
                message: "Unable to create application."
            })
            return
        }

        res.status(404).json({
            status: "success",
            application
        })


    } catch (error) {
        console.log(error)
        next(error)
    }

}




// View all single job applications (employees vs company)
const getAllApplications = async (req, res, next) => {
    res.json({message: "your aplications"})

    // const applicationCriteria = {}
    

    // if (req.user.role == "company") {
    //     applicationCriteria.company = req.user.id;
    // }

    // try {
        

    //     const { data, pages, numOfDocs, currentPage } = await fetchData(req, Applications, applicationCriteria);

    //     const applications = data
    //     const numOfApplications = numOfDocs

    //     if (!applications) {
    //         res.status(404).json({
    //             status: "failed",
    //             message: "unable to fetch applications"
    //         })

    //         return
    //     }

    //     res.status(200).json({
    //         status: "success",
    //         pages,
    //         currentPage,
    //         numOfApplications,
    //         applications
    //     })

    // } catch (error) {
    //     console.log(error)
    //     next(error)
    // }

}


// get single application
const getSingleApplication = async (req, res, next) => {

}


// delete aplication/remove
const deleteApplication = async (req, res, next) => {

    try {
        const application = await Applications.findById(req.params.id)

        if (!application) {
            res.status(404).json({
                status: "failed",
                message: "unable to fetch this application"
            })
            return
        }


        if (application.candidate.toString() !== req.user.id && application.company.toString() !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })

            return
        }



        await Applications.findByIdAndDelete(req.params.id)

        res.status(200).json({ status: "success", message: "successfully deleted." })

    } catch (error) {
        console.log(error);
        next(error)
    }
}

// update application
const updateApplication = async (req, res, next) => {
    try {

        const application = await Applications.findById(req.params.id)

        if (!application) {
            res.status(404).json({
                status: "failed",
                message: "unable to fetch this application"
            })
            return
        }


        if (application.company.toString() !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })

            return
        }

       const updatedApplication = await Applications.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        res.status(200).json({ status: "success", message: "successfully updated.", updatedApplication })

    } catch (error) {
        console.log(error)
        next(error)
    }
}





module.exports = { createApplication, getAllApplications, deleteApplication, updateApplication }