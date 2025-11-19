const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
  const [rows] = await User.getAll();
  res.json(rows);
};

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hash,
    role,
  });

  res.json({ message: "User berhasil ditambahkan" });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  await User.update(id, { username, email, role });
  res.json({ message: "User berhasil diupdate" });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.delete(id);
  res.json({ message: "User berhasil dihapus" });
};
