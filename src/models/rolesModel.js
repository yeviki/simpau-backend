// models/rolesModel.js
const db = require("../config/db");

module.exports = {
  getAll() {
    return db.query("SELECT id, roles_name FROM syst_roles ORDER BY id ASC");
  },

  getById(id) {
    return db.execute("SELECT * FROM syst_roles WHERE id = ?", [id]);
  },

  getByRoles(roles_name) {
    return db.query("SELECT * FROM syst_roles WHERE roles_name = ?", [roles_name]);
  },

  create(data) {
    return db.query(
      "INSERT INTO syst_roles (roles_name) VALUES (?)",
      [data.roles_name]
    );
  },

  update(id, data) {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key}=?`);
      values.push(data[key]);
    }

    values.push(id);

    const sql = `UPDATE syst_roles SET ${fields.join(", ")} WHERE id=?`;
    return db.query(sql, values);
  },

  delete(id) {
    return db.query("DELETE FROM syst_roles WHERE id=?", [id]);
  },

  checkDuplicate(roles_name) {
    return db.query(
      "SELECT id, roles_name FROM syst_roles WHERE (roles_name = ?)",
      [roles_name]
    );
  },

  checkDuplicateOnUpdate(id, roles_name) {
    return db.query(
      "SELECT id, roles_name FROM syst_roles WHERE (roles_name = ?) AND id != ?",
      [roles_name, id]
    );
  },

  // ------------------------------------------------ //
  // Ambil menu apa saja yang dimiliki role ini
  getAllMenu() {
      return db.query(`
        SELECT id_menu, title_menu, url_menu, icon_menu, order_menu, parent_id 
        FROM syst_menu 
        ORDER BY id_menu ASC
      `);
    },

  getRoleMenus(roles_id) {
    return db.query(
      "SELECT menu_id FROM syst_roles_menu WHERE roles_id = ?",
      [roles_id]
    );
  },

  // Hapus semua menu pada role ini
  deleteRoleMenus(roles_id) {
    return db.query(
      "DELETE FROM syst_roles_menu WHERE roles_id = ?",
      [roles_id]
    );
  },

  // Simpan menu baru (pivot)
  addRoleMenus(roles_id, menu_ids) {
    if (menu_ids.length === 0) return Promise.resolve([true]);

    const values = menu_ids.map(menu_id => [roles_id, menu_id]);

    return db.query(
      "INSERT INTO syst_roles_menu (roles_id, menu_id) VALUES ?",
      [values]
    );
  }

};
