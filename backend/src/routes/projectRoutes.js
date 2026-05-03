const router = require("express").Router();

const {
  createProject,
  getProjects,
  addMember,
  removeMember
} = require("../controllers/projectController");

const { auth } = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", auth, createProject);

// GET PROJECTS
router.get("/", auth, getProjects);

// ADD MEMBER (✅ FIXED ROUTE)
router.post("/:id/add-member", auth, addMember);

// REMOVE MEMBER (OPTIONAL)
router.post("/:id/remove-member", auth, removeMember);

module.exports = router;