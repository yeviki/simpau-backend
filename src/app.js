require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ====== MIDDLEWARE DASAR ======
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====== ROUTES ======
app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// ============================================================
// ============== GLOBAL ERROR HANDLER ========================
// ============================================================
// Semua error yg dilempar di controller (next(error))
// akan ditangkap di sini.
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err); // untuk log di server

  // Jika error punya statusCode → gunakan
  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Terjadi kesalahan pada server",
  });
});


// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
