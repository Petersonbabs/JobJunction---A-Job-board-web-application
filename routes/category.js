const router = require("express").Router();
const { createCategory, getCategoryJobs, getAllCategories, updateCategory, deleteCategory } = require("../controllers/category");
const { isAuthenticated, isAdmin,  } = require("../middlewares/auth");

router.route("/").get(getAllCategories);

router.route("/:id").patch(isAuthenticated, isAdmin, updateCategory).delete(isAuthenticated, isAdmin, deleteCategory);

router.route("/create").post(isAuthenticated, isAdmin, createCategory);
router.route("/:id/jobs").get(getCategoryJobs);

module.exports = router