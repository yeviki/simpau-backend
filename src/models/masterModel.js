// models/masterModel.js
const db = require("../config/db");

module.exports = {
  getComboStatus() {
    return db.query("SELECT id, status_name FROM syst_status ORDER BY id ASC");
  },

  getById(id) {
    return db.execute("SELECT * FROM syst_status WHERE id = ?", [id]);
  },

  getTotalUsers() {
    return db.query("SELECT COUNT(*) AS total FROM syst_users");
  },

  getTotalRoles() {
    return db.query("SELECT COUNT(*) AS total FROM syst_roles");
  },

  getLastLogin() {
    return db.query(`SELECT login_time 
      FROM syst_login_history 
      WHERE login_time IS NOT NULL 
      ORDER BY login_time DESC 
      LIMIT 1
    `);
  },
};
