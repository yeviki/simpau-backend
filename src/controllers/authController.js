// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// --- Controller ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // email → sebenarnya identifier (bisa email atau username)
  const identifier = email;

  const [rows] = await User.getByIdentifier(identifier);

  if (rows.length === 0) {
    // simpan login gagal, user_id = null
    await User.saveLoginHistory(null, "failed", req, identifier);
    return res.status(400).json({ message: "Email atau Username tidak ditemukan" });
  }

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // simpan login gagal
    await User.saveLoginHistory(user.id, "failed", req, identifier);
    return res.status(400).json({ message: "Password salah" });
  }

  // login berhasil → simpan history
  await User.saveLoginHistory(user.id, "success", req, identifier);

  const token = jwt.sign(
    { id: user.id, roles_id: user.roles_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return res.json({
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

exports.logout = async (req, res) => {
  try {
    const user_id = req.user.id; // ambil dari JWT middleware
    const token = req.headers.authorization?.split(' ')[1];

    if (!user_id) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    // update logout_time di record login terakhir user yang status = 'success' dan logout_time masih NULL
    await User.updateLogoutTime(user_id);

    return res.json({ message: "Logout berhasil" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
};

