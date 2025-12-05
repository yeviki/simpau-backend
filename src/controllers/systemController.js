// controllers/systemController.js
const ModelSystem = require("../models/systemModel");

// =============================================== //
//   GET STATUS MAINTENANCE
// =============================================== //
exports.getMaintenanceStatus = async (req, res, next) => {
    try {
        const [rows] = await ModelSystem.getMaintenanceStatus();

        // Jika tidak ditemukan → default normal (0)
        const status = rows.length ? rows[0].value : "0";

        return res.json({
        status: Number(status)   // 1 = maintenance, 0 = normal
        });
    } catch (err) {
        next(err);
    }
};

// =============================================== //
//   UPDATE / SET MODE MAINTENANCE
// =============================================== //
exports.setMaintenanceMode = async (req, res, next) => {
    try {
        const { status } = req.body; 
        // status = "maintenance" | "normal"

        const modeValue = status === "maintenance" ? "1" : "0";

        // Simpan status ke database
        await ModelSystem.updateMaintenanceStatus(modeValue);

        if (modeValue === "1") {
        // MODE → MAINTENANCE
        // Force logout semua user kecuali admin
        await ModelSystem.forceLogoutNonAdmin();
        } else {
        // MODE → NORMAL
        // Reset semua force_logout = 0
        await ModelSystem.resetForceLogout();
        }

        return res.json({
        success: true,
        message: "Mode aplikasi diperbarui",
        mode: status
        });

    } catch (err) {
        next(err);
    }
};

