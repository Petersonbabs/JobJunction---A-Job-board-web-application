const router = require("express").Router();
const { getAllApplications } = require("../controllers/application");
const { updateCompany, deleteCompany, getCompanyJobs } = require("../controllers/company");
const { getAllCompanies, getSingleCompany, getCompanyDashboard } = require("../controllers/company");
const { isAuthenticated, isCompany } = require("../middlewares/auth");


// comapanies
router.route("/")
.get(getAllCompanies)

router.route("/dashboard")
.get(isAuthenticated, isCompany, getCompanyDashboard);


router.route("/:id").get(getSingleCompany).patch(isAuthenticated, isCompany, updateCompany).delete(isAuthenticated, deleteCompany)

router.route("/:id/jobs").get(getCompanyJobs)

// view all applications for a single job
router.route("/:jobid/applications").get(isAuthenticated, isCompany, getAllApplications);

module.exports = router