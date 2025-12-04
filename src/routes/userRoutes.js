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
// router.get("/", auth, role(null, null, 1, 2, 3), getMenu); contoh jika set manual dan otomatis, jika ingin manual saja silahkan hapus null, null nya
// router.get("/", auth, role(1, 2, 3), getUsers); // Manual configurasi
router.get("/", auth, role("users", "index"), getUsers);

// router.post("/", auth, role(1), createUser); // Manual configurasi
router.post("/", auth, role("users", "create"), createUser);
// SEMENTARA (untuk buat user pertama)
// router.post("/", createUser);

// router.put("/:id", auth, role(1, 2), updateUser); // Manual configurasi
router.put("/:id", auth, role("users", "update"), updateUser);

// router.delete("/:id", auth, role(1), deleteUser); // Manual configurasi
router.delete("/:id", auth, role("users", "delete"), deleteUser);

module.exports = router;
