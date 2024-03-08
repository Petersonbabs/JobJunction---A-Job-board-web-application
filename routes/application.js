const router = require("express").Router()
const { createApplication, getAllApplications, deleteApplication, updateApplication } = require("../controllers/application")
const { isAuthenticated, isEmployee, isCompany } = require("../middlewares/auth")


router.route("/:id").post(isAuthenticated, isEmployee, createApplication).delete(isAuthenticated, deleteApplication).patch(isAuthenticated, isCompany, updateApplication)




module.exports = router