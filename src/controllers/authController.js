// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await User.getByEmail(email);

  if (rows.length === 0) {
    return res.status(400).json({ message: "Email tidak ditemukan" });
  }

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: "Password salah" });
  }

  const token = jwt.sign(
    { id: user.id, roles_id: user.roles_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  res.json({
    message: "Login berhasil",
    token,
    user: { id: user.id, name: user.name, roles_id: user.roles_id },
  });
};

exports.getMenu = async (req, res) => {
  const roles_id = req.user.roles_id;

  const [rows] = await User.getMenuByRole(roles_id);

  res.json({
    success: true,
    menu: rows,
  });
};


// ---- GET /auth/me ----
exports.me = async (req, res) => {
  const [rows] = await User.getById(req.user.id);

  if (rows.length === 0) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  const user = rows[0];

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    roles_id: user.roles_id,
    roles_name: user.roles_name,
  });
};
