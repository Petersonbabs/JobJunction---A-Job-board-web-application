const Jobs = require("../models/job");

// Create Job
const createJob = async (req, res, next) => {

    const { title, description, salary, requirements, applicationDeadline, category, hiringNum, feedback } = req.body

    try {

        const job = await Jobs.create({ title, description, salary, requirements, applicationDeadline, category, hiringNum, feedback, company: req.user.id })

        if (!job) {
            res.status(404).json({
                status: "failed",
                message: "Unable to post job"
            })

            return
        }

        res.status(201).json({
            status: "success",
            job
        })

    } catch (error) {
        console.log(error);
        next(error)
    }

}

// get all jobs
const getAllJobs = async (req, res, next) => {

    // query criteria
    let queryCriteria = {}


    if (req.query.search) {
        const { search } = req.query
        queryCriteria = {
            $or: [
                { title: { $regex: search, $options: 'i' }  },
                {description: { $regex: search, $options: 'i' } }
            ]
        }
    }
    console.log(queryCriteria);

    // pagination
    const pageSize = 10
    const currentPage = +req.query.pageNum || 1


    try {
        const numOfJobs = await Jobs.find(queryCriteria).estimatedDocumentCount();
        const jobs = await Jobs.find().sort({ createdAt: -1 }).skip(pageSize * (currentPage - 1)).limit(pageSize).populate("company")

        if (!jobs || jobs.length == 0) {
            res.status(404).json({
                status: "failure",
                message: "Unable to fetch Jobs"
            })
            return
        }

        res.status(200).json({
            status: "success",
            pages: Math.ceil(numOfJobs / pageSize),
            currentPage,
            numOfJobs,
            jobs
        })


    } catch (error) {
        console.log(error);
        next(error)
    }
}

// get single job
const getSingleJob = async (req, res, next) => {

    try {
        const job = await Jobs.findById(req.params.id).populate("company")

        if (!job) {
            res.status(404).json({
                status: "failure",
                message: "Unable to fetch Job"
            })
            return
        }

        res.status(200).json({
            status: "success",
            job
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}


// Update job
const updateJob = async (req, res, next) => {

    try {

        const job = await Jobs.findById(req.params.id);
        
        if (job.company !== req.user.id && req.user.role !== "admin") {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })
            return
        }

        const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedJob) {
            res.status(404).json({
                status: "failed",
                message: "Unable to update this Job."
            })
            return
        }

        res.status(200).json({
            status: "success",
            employee: updatedJob
        })

    } catch (error) {
        console.log(error);
        next(error)
    }

}

// Update job
const deleteJob = async (req, res, next) => {

    try {

        const job = await Jobs.findById(req.params.id);
        
        if (job.company !== req.user.id && req.user.role !== "admin") {
            res.status(403).json({
                status: "failed",
                message: "Access denied."
            })
            return
        }

        await Jobs.findByIdAndDelete(req.params.id);


        res.status(200).json({
            status: "success",
            message: "job deleted"
        })

    } catch (error) {
        console.log(error);
        next(error)
    }

}

module.exports = { createJob, getAllJobs, getSingleJob, updateJob, deleteJob }