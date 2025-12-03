// routes/masterRoutes.js
const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

// Import controller combobox
const { getComboStatus } = require("../controllers/masterController");

// GET COMBO STATUS
router.get("/combo-status", auth, role(null, null, 1, 2, 3, 4), getComboStatus);

module.exports = router;
