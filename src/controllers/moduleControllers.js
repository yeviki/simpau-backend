// controllers/rolesController.js
const ModelData = require("../models/rolesModel");
const { sanitize } = require("../utils/validate");

// Helper untuk error per-field
const fieldError = (fields, code = 400) => {
  const err = new Error("Validation Error");
  err.status = code;
  err.fields = fields; // <-- penting!
  throw err;
};

exports.getModule = async (req, res, next) => {
  try {
    const [rows] = await ModelData.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createModule = async (req, res, next) => {
  try {
    const roles_name  = sanitize(req.body.roles_name);

    // VALIDASI DUPLIKAT
    const [exist] = await ModelData.checkDuplicate(roles_name);
    if (exist.length > 0) {
      const errors = {};

      if (exist[0].roles_name === roles_name) {
        errors.roles_name = "Nama module sudah digunakan";
      }
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    // SIMPAN
    await ModelData.create({ roles_name });

    res.json({ message: "Modul berhasil ditambahkan" });

  } catch (err) {
    next(err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roles_name = sanitize(req.body.roles_name);

    const [exist] = await ModelData.checkDuplicateOnUpdate(id, roles_name);

    if (exist.length > 0) {
      const errors = {};
      if (exist[0].roles_name === roles_name) {
        errors.roles_name = "Module sudah digunakan";
      }
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    const data = { roles_name };

    const [result] = await ModelData.update(id, data);

    if (result.affectedRows === 0) {
      return fieldError({ general: "Module tidak ditemukan" }, 404);
    }

    res.json({ message: "Module berhasil diupdate" });

  } catch (err) {
    next(err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await ModelData.delete(id);
    if (result.affectedRows === 0) {
      return fieldError({ general: "Module tidak ditemukan" }, 404);
    }

    res.json({ message: "Module berhasil dihapus" });

  } catch (err) {
    next(err);
  }
};



