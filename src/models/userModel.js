const db = require("../config/db");

module.exports = {
  getAll() {
    return db.query("SELECT * FROM users");
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
    return db.query(
      "UPDATE users SET username=?, email=?, role=? WHERE id=?",
      [data.username, data.email, data.role, id]
    );
  },

  delete(id) {
    return db.query("DELETE FROM users WHERE id=?", [id]);
  }
};
