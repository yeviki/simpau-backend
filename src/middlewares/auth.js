// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // ambil token dari header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // tambahkan informasi user ke request object
    req.user = decoded; // misal: { id, roles_id }

    next();
  } catch (err) {
    // jika token expired atau invalid
    console.error("Auth Middleware Error:", err.message);
    return res.status(403).json({ message: "Token invalid atau expired" });
  }
};
