// routes/userRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Deklarasikan seluruh controler yang sudah dibuatkan
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// Hanya adminsuper & adminlocal yang boleh CRUD users
router.get("/", auth, role(1, 2, 3), getUsers);

router.post("/", auth, role(1), createUser);
// SEMENTARA (untuk buat user pertama)
// router.post("/", createUser);

router.put("/:id", auth, role(1, 2), updateUser);

router.delete("/:id", auth, role(1), deleteUser);

module.exports = router;
