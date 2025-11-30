// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    // Verifikasi token (auto catch expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);

    // Token expired / invalid harusnya status 401
    return res.status(401).json({ message: "Token invalid atau expired" });
  }
};
