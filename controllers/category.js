const Jobs = require("../models/job");
const Categories = require("../models/category");
const fetchDocs = require("../middlewares/fetching");

// create category
const createCategory = async (req, res, next) => {
    try {

        const category = await Categories.create(req.body);
        if (!category) {
            res.status(404).json({
                status: "failed",
                message: "unable to create category"
            })
            return
        }

        res.status(201).json({
            status: "success",
            category
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}



// TODO: pROTECT THIS FUNCTION
const updateCategory = async (req, res, next) => {


    try {

        const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })


        if (!updatedCategory) {
            res.status(404).json({
                status: "failed",
                message: "Unable to update category."
            })
            return
        }

        res.status(200).json({
            status: "success",
            category: updatedCategory
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Delete Employee
const deleteCategory = async (req, res, next) => {


    try {
        const category = await Categories.findById(req.params.id)

        !category ?

            res.status(404).json({ status: "failed", message: "cań't find this category" }
            )
            :
            await Categories.deleteOne(category)


        res.status(204)

    } catch (error) {
        console.log(error)
        next(error)
    }
}


// get all categories
const getAllCategories = async (req, res, next) => {

    // pagination

    try {

        const { data, currentPage, numOfDocs, pages } = await fetchDocs(req, Categories)
        const categories = data
        const numOfCategories = numOfDocs

        if (!categories || categories.length == 0) {
            res.status(404).json({
                status: "failure",
                message: "Unable to fetch categories"
            })
            return
        }

        res.status(200).json({
            status: "success",
            pages,
            currentPage,
            numOfCategories,
            categories
        })


    } catch (error) {
        console.log(error);
        next(error)
    }

}


// get category jobs 
const getCategoryJobs = async (req, res, next) => {

    const jobsCriteria = { category: req.params.id }

    try {
        const { data, currentPage, pages, numOfDocs } = await fetchDocs(req, Jobs, jobsCriteria);

        const numOfJobs = numOfDocs
        const jobs = await data
        console.log(jobs)

        if (!jobs) {
            res.status(404).json({
                status: "failed",
                message: "unable to fetch the jobs in this category"
            })

            return
        }

        res.status(200).json({
            status: "success",
            numOfJobs,
            currentPage,
            pages,
            jobs
        })

    } catch (error) {
        console.log(error)
        next(error)
    }

}

// get category length
const getCategoryLength = async (req, res, next) => {
    try {
        const categories = await Jobs.distinct("category")
        const categoriesWithLength = []

        for (const category of categories) {
            const jobs = await Jobs.find({ category })
            categoriesWithLength.push({ category, length: jobs.length })
        }

        res.status(200).json({
            status: "Success",
            message: "Length of categories fetched successfully.",
            categories: categoriesWithLength
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { createCategory, getCategoryJobs, getAllCategories, updateCategory, deleteCategory, getCategoryLength }