// routes/rolesRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Deklarasikan seluruh controler yang sudah dibuatkan
const {
  getControl,
  createControl,
  updateControl,
  deleteControl,
} = require("../controllers/controlController");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// router.get("/", auth, role(null, null, 1, 2, 3), getMenu); contoh jika set manual dan otomatis, jika ingin manual saja silahkan hapus null, null nya
// router.get("/", auth, role(1, 2, 3), getControl); // setting role manual saja

// CRUD ROLES
router.get("/", auth, role(null, null, 1, 2, 3), getControl);
router.post("/", auth, role(null, null, 1), createControl);
router.put("/:id", auth, role(null, null, 1, 2), updateControl);
router.delete("/:id", auth, role(null, null, 1), deleteControl);

module.exports = router;

