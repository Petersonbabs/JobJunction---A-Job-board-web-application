const router = require("express").Router()
const { createApplication, deleteApplication, updateApplication } = require("../controllers/application")
const { uploadFile } = require("../controllers/upload")
const { isAuthenticated, isEmployee, isCompany } = require("../middlewares/auth")


router.route("/:id").post(isAuthenticated, isEmployee, uploadFile, createApplication).delete(isAuthenticated, deleteApplication).patch(isAuthenticated, isCompany, updateApplication)




module.exports = router