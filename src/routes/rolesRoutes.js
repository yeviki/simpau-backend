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
  getPermissionGrouped,
  updateStatusPermission,
  deletePermission,
} = require("../controllers/rolesController");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// router.get("/", auth, role(null, null, 1, 2, 3), getMenu); contoh jika set manual dan otomatis, jika ingin manual saja silahkan hapus null, null nya
// router.get("/", auth, role(1, 2, 3), getRoles); // setting role manual saja

// CRUD ROLES
router.get("/", auth, role(null, null, 1, 2, 3), getRoles);
router.post("/", auth, role(null, null, 1), createRoles);
router.put("/:id", auth, role(null, null, 1, 2), updateRoles);
router.delete("/:id", auth, role(null, null, 1), deleteRoles);

// ------------------------------
// FIX: ubah route dari "/" agar tidak menimpa getRoles
// ------------------------------

// AMBIL SEMUA MENU
router.get("/menu/all", auth, role(null, null, 1, 2, 3), getMenu);

// MENU MILIK ROLE
router.get("/:id/menus", auth, role(null, null, 1, 2, 3), getRoleMenus);

// UPDATE MENU ROLE
router.post("/:id/menus", auth, role(null, null, 1), updateRoleMenus);

// ------------------------------
// Data Roles Permission
// routes/rolesRoutes.js
// ------------------------------
// AMBIL SEMUA MODULE DAN CONTROL PADA TABEL syst_roles_permission
// router.get("/permission/all", auth, role(null, null, 1, 2, 3), getPermission);
router.get("/permission/:id/grouped", auth, role(null, null, 1, 2, 3), getPermissionGrouped);
router.post(
  "/permission/:id/status",
  auth,
  role(null, null, 1, 2, 3),
  updateStatusPermission
);

router.delete(
  "/permission/:id",
  auth,
  role(null, null, 1, 2, 3),
  deletePermission
);

module.exports = router;

