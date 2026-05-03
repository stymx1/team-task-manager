const router = require("express").Router();
const prisma = require("../config/db");

const {
  createTask,
  updateStatus,
  dashboard
} = require("../controllers/taskController");

const { auth } = require("../middleware/authMiddleware");
const { isProjectMember } = require("../middleware/projectMiddleware");
const { validateTask } = require("../middleware/validate");

// ✅ CREATE TASK
router.post("/", auth, validateTask, isProjectMember, createTask);

// ✅ GET ALL TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assignedTo: req.user.id },
          {
            project: {
              members: {
                some: { userId: req.user.id }
              }
            }
          }
        ]
      },
      include: {
        user: true,
        project: true
      }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🔥 VERY IMPORTANT → PUT THIS BEFORE :id ROUTES
router.get("/project/:id", auth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: req.params.id
      },
      include: {
        user: true,
        project: true
      }
    });

    res.json(tasks);
  } catch (err) {
    console.error("PROJECT TASK ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
});

// ✅ UPDATE STATUS
router.put("/:id", auth, updateStatus);

// ✅ ASSIGN TASK
router.put("/:id/assign", auth, async (req, res) => {
  try {
    const { userId } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: { project: { include: { members: true } } }
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    const isMember = task.project.members.some(
      m => m.userId === req.user.id
    );

    if (!isMember && req.user.role !== "ADMIN") {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updated = await prisma.task.update({
      where: { id: req.params.id },
      data: { assignedTo: userId }
    });

    res.json(updated);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

// ✅ DASHBOARD
router.get("/dashboard", auth, dashboard);

module.exports = router;