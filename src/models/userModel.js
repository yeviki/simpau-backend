// models/userModel.js
const db = require("../config/db");

module.exports = {
  getAll() {
    return db.query("SELECT id, username, email, role FROM users ORDER BY id ASC");
  },

  getById(id) {
    return db.execute("SELECT * FROM users WHERE id = ?", [id]);
  },

  getByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = ?", [email]);
  },

  create(data) {
    return db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [data.username, data.email, data.password, data.role]
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

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;
    return db.query(sql, values);
  },

  delete(id) {
    return db.query("DELETE FROM users WHERE id=?", [id]);
  },

  checkDuplicate(username, email) {
    return db.query(
      "SELECT id, username, email FROM users WHERE (username = ? OR email = ?)",
      [username, email]
    );
  },

  checkDuplicateOnUpdate(id, username, email) {
    return db.query(
      "SELECT id, username, email FROM users WHERE (username = ? OR email = ?) AND id != ?",
      [username, email, id]
    );
  }

};
