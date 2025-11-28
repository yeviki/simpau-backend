// routes/rolesRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Deklarasikan seluruh controler yang sudah dibuatkan
const {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles,
  getMenu,
  getRoleMenus,
  updateRoleMenus,
} = require("../controllers/rolesController");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// CRUD ROLES
router.get("/", auth, role(1, 2, 3), getRoles);
router.post("/", auth, role(1), createRoles);
router.put("/:id", auth, role(1, 2), updateRoles);
router.delete("/:id", auth, role(1), deleteRoles);

// ------------------------------
// FIX: ubah route dari "/" agar tidak menimpa getRoles
// ------------------------------

// AMBIL SEMUA MENU
router.get("/menu/all", auth, role(1, 2, 3), getMenu);

// MENU MILIK ROLE
router.get("/:id/menus", auth, role(1, 2, 3), getRoleMenus);

// UPDATE MENU ROLE
router.post("/:id/menus", auth, role(1), updateRoleMenus);

module.exports = router;

