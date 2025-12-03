// models/masterModel.js
const db = require("../config/db");

module.exports = {
  getComboStatus() {
    return db.query("SELECT id, status_name FROM syst_status ORDER BY id ASC");
  },

  getById(id) {
    return db.execute("SELECT * FROM syst_status WHERE id = ?", [id]);
  }
};
