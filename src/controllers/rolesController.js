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

exports.getRoles = async (req, res, next) => {
  try {
    const [rows] = await ModelData.getAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createRoles = async (req, res, next) => {
  try {
    const roles_name  = sanitize(req.body.roles_name);

    // VALIDASI DUPLIKAT
    const [exist] = await ModelData.checkDuplicate(roles_name);
    if (exist.length > 0) {
      const errors = {};

      if (exist[0].roles_name === roles_name) {
        errors.roles_name = "Nama roles sudah digunakan";
      }
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    // SIMPAN
    await ModelData.create({ roles_name });

    res.json({ message: "Roles berhasil ditambahkan" });

  } catch (err) {
    next(err);
  }
};

exports.updateRoles = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roles_name = sanitize(req.body.roles_name);

    const [exist] = await ModelData.checkDuplicateOnUpdate(id, roles_name);

    if (exist.length > 0) {
      const errors = {};
      if (exist[0].roles_name === roles_name) {
        errors.roles_name = "Roles sudah digunakan";
      }
      if (Object.keys(errors).length > 0) {
        return fieldError(errors);
      }
    }

    const data = { roles_name };

    const [result] = await ModelData.update(id, data);

    if (result.affectedRows === 0) {
      return fieldError({ general: "Roles tidak ditemukan" }, 404);
    }

    res.json({ message: "Roles berhasil diupdate" });

  } catch (err) {
    next(err);
  }
};

exports.deleteRoles = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await ModelData.delete(id);
    if (result.affectedRows === 0) {
      return fieldError({ general: "Roles tidak ditemukan" }, 404);
    }

    res.json({ message: "Roles berhasil dihapus" });

  } catch (err) {
    next(err);
  }
};

// --------------------------------------------- //
// Detail Roles Menu
exports.getMenu = async (req, res, next) => {
  try {
    const [rows] = await ModelData.getAllMenu();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getRoleMenus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await ModelData.getRoleMenus(id);

    res.json(rows.map(r => r.menu_id));
  } catch (err) {
    next(err);
  }
};

// exports.updateRoleMenus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const menu_ids = req.body.menu_ids || [];

//     // Hapus semua menu lama
//     await ModelData.deleteRoleMenus(id);

//     // Simpan kembali menu baru
//     if (menu_ids.length > 0) {
//       await ModelData.addRoleMenus(id, menu_ids);
//     }

//     res.json({ message: "Hak akses berhasil diperbarui" });
//   } catch (err) {
//     next(err);
//   }
// };

exports.updateRoleMenus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu_ids = req.body.menu_ids || [];

    // 1. Ambil menu yg sudah tersimpan untuk role ini
    const [existing] = await ModelData.getAllRoleMenus(id);
    const existingIds = existing.map(r => r.menu_id);

    // 2. Loop semua menu yg dikirim dari frontend
    for (let menu_id of menu_ids) {

      // Jika sudah ada → UPDATE id_status = 1
      if (existingIds.includes(menu_id)) {
        await ModelData.updateRoleMenuStatus(id, menu_id, 1);
      } else {
        // Jika belum ada → INSERT baru
        await ModelData.insertRoleMenu(id, menu_id);
      }
    }

    // 3. Menu yg tidak dipilih → UPDATE id_status = 0
    for (let oldMenuId of existingIds) {
      if (!menu_ids.includes(oldMenuId)) {
        await ModelData.updateRoleMenuStatus(id, oldMenuId, 0);
      }
    }

    res.json({ message: "Hak akses berhasil diperbarui" });
  } catch (err) {
    next(err);
  }
};


