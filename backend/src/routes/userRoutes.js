const router = require("express").Router();
const prisma = require("../config/db");
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true }
  });
  res.json(users);
});

module.exports = router;