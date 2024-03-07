const router = require("express").Router();
const { updateCompany, deleteCompany } = require("../controllers/company");
const { getAllCompanies, getSingleCompany, getCompanyDashboard } = require("../controllers/company");
const { isAuthenticated, isCompany } = require("../middlewares/auth");


// comapanies
router.route("/")
.get(getAllCompanies)

router.route("/dashboard")
.get(isAuthenticated, isCompany, getCompanyDashboard);


router.route("/:id").get(getSingleCompany).patch(isAuthenticated, isCompany, updateCompany).delete(isAuthenticated, deleteCompany)


module.exports = router