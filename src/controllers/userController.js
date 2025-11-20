const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { isEmail, isStrongPassword, sanitize } = require("../utils/validate");

// Helper lempar error
const throwError = (msg, code = 400) => {
  const err = new Error(msg);
  err.status = code;
  throw err;
};

exports.getUsers = async (req, res, next) => {
  try {
    const [rows] = await User.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const username = sanitize(req.body.username);
    const email = sanitize(req.body.email);
    const password = req.body.password;
    const role = req.body.role;

    if (!isEmail(email)) throwError("Format email tidak valid");
    if (!isStrongPassword(password))
      throwError("Password minimal 6 karakter");

    const [exist] = await User.checkDuplicate(username, email);
    if (exist.length > 0)
      throwError("Username atau Email sudah digunakan");

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hash,
      role,
    });

    res.json({ message: "User berhasil ditambahkan" });

  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const username = sanitize(req.body.username);
    const email = sanitize(req.body.email);
    const role = req.body.role;
    const password = req.body.password;

    if (!isEmail(email)) throwError("Format email tidak valid");

    const [exist] = await User.checkDuplicateOnUpdate(id, username, email);
    if (exist.length > 0)
      throwError("Username atau Email sudah digunakan user lain");

    const data = { username, email, role };

    if (password && password.trim() !== "") {
      if (!isStrongPassword(password))
        throwError("Password minimal 6 karakter");

      const hashed = await bcrypt.hash(password, 10);
      data.password = hashed;
    }

    const [result] = await User.update(id, data);

    if (result.affectedRows === 0)
      throwError("User tidak ditemukan", 404);

    res.json({ message: "User berhasil diupdate" });

  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await User.delete(id);
    if (result.affectedRows === 0)
      throwError("User tidak ditemukan", 404);

    res.json({ message: "User berhasil dihapus" });

  } catch (err) {
    next(err);
  }
};
