const router = require("express").Router();
const { getAllApplications } = require("../controllers/application");
const {  updateEmployee, deleteEmployee } = require("../controllers/employee");
const { getAllEmployees, getSingleEmployee, getEmployeeDasboard } = require("../controllers/employee");
const { uploadImage } = require("../controllers/upload");
const { isAuthenticated, isEmployee } = require("../middlewares/auth");


router.route("/").get(getAllEmployees)

router.route("/dashboard")
.get(isAuthenticated, isEmployee, getEmployeeDasboard);

// employee applications
router.route("/applications").get(isAuthenticated, isEmployee, getAllApplications);

router.route("/:id")
.get(getSingleEmployee)
.patch(isAuthenticated, isEmployee, uploadImage, updateEmployee)
.delete(isAuthenticated, isEmployee, deleteEmployee)


module.exports = router