const Companies = require("../models/company");


// Get all Companies
const getAllCompanies = async (req, res, next) => {

    // pagination
    const pageSize = 10
    const currentPage = +req.query.pageNum || 1

    try {

        const numOfCompanies = await Companies.find({}).estimatedDocumentCount();

        const companies = await Companies.find().sort({ createdAt: -1 }).skip(pageSize * (currentPage - 1)).limit(pageSize)

        if (!companies) {
            res.status(404).json({
                status: "failed",
                message: "Unable to get companies"
            })
            return
        }

        res.status(200).json({
            status: "success",
            pages: Math.ceil(numOfCompanies / pageSize),
            currentPage,
            numOfCompanies,
            companies
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}



//  get single Company
const getSingleCompany = async (req, res, next) => {

    try {
        const company = await Companies.findById(req.params.id);

        if (!company) {
            res.status(404).json({
                status: "failed",
                message: "Unable to get this Company."
            })
        }

        res.status(200).json({
            status: "success",
            company
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// TODO: pROTECT THIS FUNCTION
const updateCompany = async (req, res, next) => {
    // get logged in user's id

    try {
        // compare the user's id with the id on the profile
        const company = await Companies.findById(req.params.id)

        if (company.id !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied. You don;t own this company"
            })
            return
        }

        const updatedCompany = await Companies.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })


        if (!updatedCompany) {
            res.status(404).json({
                status: "failed",
                message: "Unable to update Company."
            })
            return
        }

        res.status(200).json({
            status: "success",
            company: updatedCompany
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Delete Employee
const deleteCompany = async (req, res, next) => {
    // get logged in user's id


    try {
        // compare the user's id with the id on the profile

        const company = await Companies.findById(req.params.id)

        if (company.id !== req.user.id) {
            res.status(403).json({
                status: "failed",
                message: "Access denied. You don;t own this company"
            })
            return
        }
        
        const user = await Companies.findOne({ email: req.user.email })

        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "Can't find this user"
            })

            return
        }

        await Companies.findByIdAndDelete(user.id)
        res.clearCookie("token")
        res.status(204)

    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getCompanyDashboard = async (req, res, next) => {

    try {
        const dashboard = await Companies.findById(req.user.id);
        if (!dashboard) {
            res.status(200).json({
                status: "Failed",
                message: "Unable to get Company's dashboard"
            })
            return
        }

        res.status(200).json({
            success: "success",
            dashboard
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}


module.exports = { getAllCompanies, getSingleCompany, getCompanyDashboard, updateCompany, deleteCompany }