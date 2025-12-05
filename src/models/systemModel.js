// models/systemModel.js
const db = require("../config/db");

module.exports = {

  // Ambil status maintenance
  getMaintenanceStatus() {
    return db.query(
      "SELECT value FROM syst_app_settings WHERE `key` = 'application_mode'"
    );
  },

  // Update mode maintenance
  updateMaintenanceStatus(value) {
    return db.query(
      "UPDATE syst_app_settings SET value = ? WHERE `key` = 'application_mode'",
      [value]
    );
  },

  // Paksa logout user selain admin (roles_id != 1)
  forceLogoutNonAdmin() {
    return db.query(`
        UPDATE syst_users 
        SET force_logout = 1 
        WHERE roles_id != 1
    `);
   },
   
   // Kembalikan force_logout menjadi 0
   resetForceLogout() {
    return db.query(`
        UPDATE syst_users 
        SET force_logout = 0
        WHERE force_logout = 1
    `);
   }

};

