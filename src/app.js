// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ====== MIDDLEWARE DASAR ======
// Ganti IP Localhost Jika IP Frontend berubah dibawah ini
app.use(cors({
  origin: ["http://localhost:5173", "https://domainvuekamu.com"],
  credentials: true,
}));
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
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Error berbasis field (errors.username, errors.email, dll)
  if (err.fields) {
    return res.status(err.status || 400).json({
      errors: err.fields,
    });
  }

  // Error biasa
  return res.status(err.status || 500).json({
    errors: {
      general: err.message || "Terjadi kesalahan pada server",
    },
  });
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
