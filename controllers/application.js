const Applications = require("../models/application");
const Jobs = require("../models/job");
const fetchData = require("../middlewares/fetching");

// Create Application (employee only)
const createApplication = async (req, res, next) => {

    const { applicationStatus, message, resume } = req.body
    

    try { 


        const { company } = await Jobs.findById(req.params.id)
        

        const application = await Applications.create({ candidate: req.user.id, applicationStatus, job: req.params.id, message, company, resume })

        if (!application) {
            res.status(404).json({
                status: "failed",
                message: "Unable to Submit application. Please try again."
            })
            return
        }

        res.status(201).json({
            status: "success",
            message: "Your application has been sent!",
            application
        })


    } catch (error) {
        console.log(error)
        next(error)
    }

}




// View all single job applications (employees vs company)
const getAllApplications = async (req, res, next) => {
    
    const applicationCriteria = {}
    

    if (req.user.role == "company") {
        applicationCriteria.company = req.user.id;
        if(req.query.jobId){
            applicationCriteria.job = req.query.jobId
        }
        if(req.query.status){
            applicationCriteria.job = req.query.status
        }
    } else if (req.user.role == "employee"){
        applicationCriteria.candidate = req.user.id
    }



    try {
        

        const { data, pages, numOfDocs, currentPage } = await fetchData(req, Applications, applicationCriteria, "candidate", "company", "job");

        const applications = data
        const numOfApplications = numOfDocs

        if (!applications) {
            res.status(404).json({
                status: "fail",
                message: "No applications found"
            })

            return
        }

        res.status(200).json({
            status: "success",
            pages,
            currentPage,
            numOfApplications,
            applications
        })

    } catch (error) {
        console.log(error)
        next(error)
    }

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
    console.log(req.params)
    console.log(req.body)
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

        res.status(200).json({ status: "success", message: "successfully updated.", application: updatedApplication })

    } catch (error) {
        console.log(error)
        next(error)
    }
}





module.exports = { createApplication, getAllApplications, deleteApplication, updateApplication }