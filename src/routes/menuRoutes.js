// routes/userRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Deklarasikan seluruh controler yang sudah dibuatkan
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// Hanya adminsuper & adminlocal yang boleh CRUD users
router.get("/", auth, role(1, 2, 3), getMenu);

router.post("/", auth, role(1), createMenu);
// SEMENTARA (untuk buat user pertama)
// router.post("/", createMenu);

router.put("/:id", auth, role(1, 2), updateMenu);

router.delete("/:id", auth, role(1), deleteMenu);

module.exports = router;
