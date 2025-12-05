const db = require("../config/db");

module.exports = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT value FROM app_settings WHERE key='application_mode' LIMIT 1`
    );

    const mode = rows[0]?.value;

    // izinkan admin mengubah mode
    if (req.path.startsWith("/admin/settings")) {
      return next();
    }

    // jika maintenance → blok seluruh user
    if (mode === "maintenance") {
      return res.status(503).json({
        status: false,
        message: "Aplikasi dalam pemeliharaan. Silakan coba lagi nanti.",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
