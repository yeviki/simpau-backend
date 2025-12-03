// controllers/masterController.js
const ModelData = require("../models/masterModel");

exports.getComboStatus = async (req, res, next) => {
  try {
    const [rows] = await ModelData.getComboStatus();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
