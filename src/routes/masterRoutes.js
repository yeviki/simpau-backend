// routes/masterRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Import controller combobox
const { getComboStatus, getStats } = require("../controllers/masterController");

// GET COMBO STATUS → bypass pengecekan role
router.get("/combo-status", auth, role(null, null), getComboStatus);

router.get("/stats", getStats);

module.exports = router;
