const prisma = require("../config/db");

exports.isProjectMember = async (req, res, next) => {
  try {
    const { projectId } = req.body;

    const member = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: req.user.id
      }
    });

    if (!member) {
      return res.status(403).json({ msg: "Not part of project" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};