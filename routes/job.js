const router = require("express").Router();
const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require("../controllers/jobs");
const { isAuthenticated, isCompany} = require("../middlewares/auth");

router.route("/").get(getAllJobs)
router.route("/post").post(isAuthenticated, isCompany, createJob)
router.route("/:id").get(getSingleJob).patch(isAuthenticated, isCompany, updateJob).delete(isAuthenticated, isCompany, deleteJob)



module.exports = router