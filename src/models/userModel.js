// models/userModel.js
const db = require("../config/db");

module.exports = {
  getAll() {
    return db.query(`
      SELECT us.*, rl.roles_name
      FROM syst_users us
      JOIN syst_roles rl ON rl.id = us.roles_id
      ORDER BY us.id ASC
    `);
  },


  getById(id) {
    return db.execute("SELECT * FROM syst_users WHERE id = ?", [id]);
  },

  getByEmail(email) {
    return db.query("SELECT * FROM syst_users WHERE email = ?", [email]);
  },

  create(data) {
    return db.query(
      "INSERT INTO syst_users (fullname, username, email, password, roles_id) VALUES (?, ?, ?, ?, ?)",
      [data.fullname, data.username, data.email, data.password, data.roles_id]
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
  }

};
