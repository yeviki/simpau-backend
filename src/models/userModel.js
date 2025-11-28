// models/userModel.js
const db = require("../config/db");

module.exports = {
  saveLoginHistory(user_id, status, req, attempted_identifier = null) {
    const ip = req.ip;
    const ua = req.headers["user-agent"];

    return db.query(
      `INSERT INTO syst_login_history 
        (user_id, attempted_email, login_time, ip_address, user_agent, status) 
        VALUES (?, ?, NOW(), ?, ?, ?)`,
      [user_id, attempted_identifier, ip, ua, status]
    );
  },

  updateLogoutTime(user_id) {
    return db.query(
      `UPDATE syst_login_history 
      SET logout_time = NOW() 
      WHERE user_id = ? AND status = 'success' AND logout_time IS NULL
      ORDER BY login_time DESC
      LIMIT 1`,
      [user_id]
    );
  },

  getMenuByRole(roles_id) {
    return db.query(`
      SELECT 
        m.id_menu,
        m.title_menu,
        m.url_menu,
        m.icon_menu,
        m.order_menu,
        m.parent_id,
        m.component
      FROM syst_roles_menu rm
      JOIN syst_menu m ON m.id_menu = rm.menu_id
      WHERE rm.roles_id = ?
        AND rm.id_status = 1
      ORDER BY m.parent_id ASC, m.order_menu ASC
    `, [roles_id]);
  },

  getAll() {
    return db.query(`
      SELECT us.*, rl.roles_name
      FROM syst_users us
      JOIN syst_roles rl ON rl.id = us.roles_id
      ORDER BY us.id ASC
    `);
  },

  getById(id) {
    return db.execute(`SELECT us.*, rl.roles_name
      FROM syst_users us
      JOIN syst_roles rl ON rl.id = us.roles_id WHERE us.id = ?`, [id]);
  },

  getByIdentifier(identifier) {
    return db.query("SELECT * FROM syst_users WHERE email = ? OR username = ? LIMIT 1", [identifier, identifier]);
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
