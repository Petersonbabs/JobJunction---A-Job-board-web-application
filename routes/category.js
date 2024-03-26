const router = require("express").Router();
const { createCategory, getCategoryJobs, getAllCategories, updateCategory, deleteCategory, getCategoryLength } = require("../controllers/category");
const { isAuthenticated, isAdmin,  } = require("../middlewares/auth");

router.route("/").get(getAllCategories);
router.route("/length").get(getCategoryLength);

router.route("/:id").patch(isAuthenticated, isAdmin, updateCategory).delete(isAuthenticated, isAdmin, deleteCategory);

router.route("/create").post(isAuthenticated, isAdmin, createCategory);
router.route("/:id/jobs").get(getCategoryJobs);

module.exports = router