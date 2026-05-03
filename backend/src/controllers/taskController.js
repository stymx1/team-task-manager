const prisma = require("../config/db");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, projectId, assignedTo } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        projectId,
        assignedTo
      }
    });

    res.json(task);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ msg: "Error creating task", error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: req.params.id }
    });

    // Only assigned user OR admin can update
    if (
      task.assignedTo !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updated = await prisma.task.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
  include: {
    user: true
  }
});

    const total = tasks.length;

    const grouped = {
      TODO: tasks.filter(t => t.status === "TODO").length,
      IN_PROGRESS: tasks.filter(t => t.status === "IN_PROGRESS").length,
      DONE: tasks.filter(t => t.status === "DONE").length
    };

    const overdue = tasks.filter(
      t => new Date(t.dueDate) < new Date() && t.status !== "DONE"
    ).length;

    // 🔥 NEW: tasks per user
   const perUser = {};

tasks.forEach(t => {
  const name = t.user.name;

  if (!perUser[name]) perUser[name] = 0;
  perUser[name]++;
});
    res.json({ total, grouped, overdue, perUser });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};