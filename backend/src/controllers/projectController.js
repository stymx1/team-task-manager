const prisma = require("../config/db");


exports.addMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { userId } = req.body;

    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId
      }
    });

    res.json(member);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (project.adminId !== req.user.id) {
      return res.status(403).json({ msg: "Only admin can remove members" });
    }

    await prisma.projectMember.deleteMany({
      where: { projectId, userId }
    });

    res.json({ msg: "Member removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { name } = req.body;

  const project = await prisma.project.create({
    data: {
      name,
      adminId: req.user.id,
      members: {
        create: { userId: req.user.id }
      }
    }
  });

  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await prisma.projectMember.findMany({
    where: { userId: req.user.id },
    include: { project: true }
  });

  res.json(projects);
};