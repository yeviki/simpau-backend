// routes/userRoutes.js
const router = require("express").Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// Hanya adminsuper & adminlocal yang boleh CRUD users
router.get("/", auth, role("adminsuper", "adminlocal", "pimpinan"), getMenu);

router.post("/", auth, role("adminsuper"), createMenu);
// SEMENTARA (untuk buat user pertama)
// router.post("/", createMenu);


router.put("/:id", auth, role("adminsuper", "adminlocal"), updateMenu);

router.delete("/:id", auth, role("adminsuper"), deleteMenu);

module.exports = router;
