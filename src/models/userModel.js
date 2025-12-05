// models/userModel.js
const db = require("../config/db");

module.exports = {
  getAllFiltered(currentRole) {
    let query = `
      SELECT 
        us.*, 
        rl.roles_name
      FROM syst_users us
      JOIN syst_roles rl ON rl.id = us.roles_id
    `;

    const params = [];

    // jika local admin → sembunyikan superadmin
    if (currentRole === 2) {
      query += ` WHERE us.roles_id != ? `;
      params.push(1); // hide superadmin
    }

    query += ` ORDER BY us.id ASC `;

    return db.query(query, params);
  },

  getAll() {
    return db.query(`
      SELECT us.*, rl.roles_name
      FROM syst_users us
      JOIN syst_roles rl ON rl.id = us.roles_id
      ORDER BY us.id ASC
    `);
  },

  create(data) {
    return db.query(
      "INSERT INTO syst_users (fullname, username, email, password, roles_id, blokir, id_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [data.fullname, data.username, data.email, data.password, data.roles_id, data.blokir, data.id_status]
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

    const sql = `UPDATE syst_users SET ${fields.join(", ")} WHERE id=?`;
    return db.query(sql, values);
  },

  delete(id) {
    return db.query("DELETE FROM syst_users WHERE id=?", [id]);
  },

  checkDuplicate(username, email) {
    return db.query(
      "SELECT id, username, email FROM syst_users WHERE (username = ? OR email = ?)",
      [username, email]
    );
  },

  checkDuplicateOnUpdate(id, username, email) {
    return db.query(
      "SELECT id, username, email FROM syst_users WHERE (username = ? OR email = ?) AND id != ?",
      [username, email, id]
    );
  },

};
