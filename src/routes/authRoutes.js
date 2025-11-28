// routes/authRoutes.js
const router = require("express").Router();
const { login, me } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// 1 Super Admin
// 2 Local Admin
// 3 Pimpinan
// 4 Staf

// POST /auth/login
router.post("/login", login);

// GET /auth/me (protected)
router.get("/me", authMiddleware, me);

module.exports = router;
