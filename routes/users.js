const router = require("express").Router();
const {  updateEmployee, deleteEmployee } = require("../controllers/employee");
const { getAllEmployees, getSingleEmployee, getEmployeeDasboard } = require("../controllers/employee");
const { isAuthenticated, isEmployee } = require("../middlewares/auth");


router.route("/").get(getAllEmployees)

router.route("/dashboard")
.get(isAuthenticated, isEmployee, getEmployeeDasboard);

router.route("/:id")
.get(getSingleEmployee)
.patch(isAuthenticated, isEmployee, updateEmployee)
.delete(isAuthenticated, isEmployee, deleteEmployee)

module.exports = router