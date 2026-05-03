exports.validateTask = (req, res, next) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  next();
};