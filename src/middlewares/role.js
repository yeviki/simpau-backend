// middlewares/role.js
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roles_id)) {
      return res.status(403).json({ message: "Akses ditolak" });
    }
    next();
  };
};
