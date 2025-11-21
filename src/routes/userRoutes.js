// routes/userRoutes.js
const router = require("express").Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Hanya adminsuper & adminlocal yang boleh CRUD users
router.get("/", auth, role("adminsuper", "adminlocal", "pimpinan"), getUsers);

router.post("/", auth, role("adminsuper"), createUser);
// SEMENTARA (untuk buat user pertama)
// router.post("/", createUser);


router.put("/:id", auth, role("adminsuper", "adminlocal"), updateUser);

router.delete("/:id", auth, role("adminsuper"), deleteUser);

module.exports = router;
