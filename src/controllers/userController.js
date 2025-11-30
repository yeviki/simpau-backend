// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { isEmail, isStrongPassword, sanitize } = require("../utils/validate");

// Helper untuk error per-field
const fieldError = (fields, code = 400) => {
  const err = new Error("Validation Error");
  err.status = code;
  err.fields = fields; // <-- penting!
  throw err;
};

exports.getUsers = async (req, res, next) => {
  try {
    const currentRole = req.user.roles_id; // dari JWT decoded

    const [rows] = await User.getAllFiltered(currentRole);
    // const [rows] = await User.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const fullname  = sanitize(req.body.fullname);
    const username  = sanitize(req.body.username);
    const email     = sanitize(req.body.email);
    const password  = req.body.password;
    const roles_id  = req.body.roles_id;
    const blokir    = req.body.blokir;
    const id_status = req.body.id_status;

    // VALIDASI
    if (!isEmail(email)) {
      return fieldError({ email: "Format email tidak valid" });
    }

    if (!isStrongPassword(password)) {
      return fieldError({ password: "Password minimal 6 karakter" });
    }

    const [exist] = await User.checkDuplicate(username, email);
    if (exist.length > 0) {
      const errors = {};

      // Cek username duplikat
      if (exist[0].username === username) {
        errors.username = "Username sudah digunakan user lain";
      }

      // Cek email duplikat
      if (exist[0].email === email) {
        errors.email = "Email sudah digunakan user lain";
      }

      // Jika ada minimal satu error field
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    // SIMPAN
    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullname, username, email, password: hash, roles_id, blokir, id_status });

    res.json({ message: "User berhasil ditambahkan" });

  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fullname  = sanitize(req.body.fullname);
    const username  = sanitize(req.body.username);
    const email     = sanitize(req.body.email);
    const roles_id  = req.body.roles_id;
    const password  = req.body.password;
    const blokir    = req.body.blokir;
    const id_status = req.body.id_status;

    if (!isEmail(email)) {
      return fieldError({ email: "Format email tidak valid" });
    }

    const [exist] = await User.checkDuplicateOnUpdate(id, username, email);

    if (exist.length > 0) {
      const errors = {};

      // Cek username duplikat
      if (exist[0].username === username) {
        errors.username = "Username sudah digunakan user lain";
      }

      // Cek email duplikat
      if (exist[0].email === email) {
        errors.email = "Email sudah digunakan user lain";
      }

      // Jika ada minimal satu error field
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    const data = { fullname, username, email, roles_id, blokir, id_status };

    if (password && password.trim() !== "") {
      if (!isStrongPassword(password)) {
        return fieldError({ password: "Password minimal 6 karakter" });
      }
      const hashed = await bcrypt.hash(password, 10);
      data.password = hashed;
    }

    const [result] = await User.update(id, data);

    if (result.affectedRows === 0) {
      return fieldError({ general: "User tidak ditemukan" }, 404);
    }

    res.json({ message: "User berhasil diupdate" });

  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await User.delete(id);
    if (result.affectedRows === 0) {
      return fieldError({ general: "User tidak ditemukan" }, 404);
    }

    res.json({ message: "User berhasil dihapus" });

  } catch (err) {
    next(err);
  }
};
