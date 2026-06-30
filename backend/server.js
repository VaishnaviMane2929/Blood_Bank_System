const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const donationRoutes = require("./routes/donationRoutes");

const requestRoutes =
require("./routes/requestRoutes");

const bloodStockRoutes = require(
  "./routes/bloodStockRoutes"
);
const campaignRoutes = require(
  "./routes/campaignRoutes"
);
const reportRoutes =
require("./routes/reportRoutes");

const adminRoutes =
require("./routes/adminRoutes");

const app = express();

// DATABASE
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);
app.use(
  "/api/requests",
  requestRoutes
);

app.use(
  "/api/blood-stock",
  bloodStockRoutes
);
app.use(
  "/api/campaigns",
  campaignRoutes
);
app.use(
"/api/reports",
reportRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.get("/", (req, res) => {
  res.send("Blood Bank API Running");
});

app.post("/test", (req, res) => {
  res.json({
    received: req.body,
  });
});


// PORT
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});