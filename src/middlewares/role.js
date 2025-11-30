// middlewares/role.js
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User tidak terautentikasi" });
    }

    if (!allowedRoles.includes(req.user.roles_id)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    next();
  };
};
