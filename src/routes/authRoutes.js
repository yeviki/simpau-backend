// routes/authRoutes.js
const router = require("express").Router();

const { login, me } = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// POST /auth/login
router.post("/login", login);

// GET /auth/me (protected)
router.get("/me", authMiddleware, me);

module.exports = router;
