// routes/rolesRoutes.js
const router = require("express").Router();

const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

const {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles,
  getMenu,
  getRoleMenus,
  updateRoleMenus,
} = require("../controllers/rolesController");

// CRUD ROLES
router.get("/", auth, role("adminsuper", "adminlocal", "pimpinan"), getRoles);
router.post("/", auth, role("adminsuper"), createRoles);
router.put("/:id", auth, role("adminsuper", "adminlocal"), updateRoles);
router.delete("/:id", auth, role("adminsuper"), deleteRoles);

// ------------------------------
// FIX: ubah route dari "/" agar tidak menimpa getRoles
// ------------------------------

// AMBIL SEMUA MENU
router.get("/menu/all", auth, role("adminsuper", "adminlocal", "pimpinan"), getMenu);

// MENU MILIK ROLE
router.get("/:id/menus", auth, role("adminsuper", "adminlocal", "pimpinan"), getRoleMenus);

// UPDATE MENU ROLE
router.post("/:id/menus", auth, role("adminsuper"), updateRoleMenus);

module.exports = router;

