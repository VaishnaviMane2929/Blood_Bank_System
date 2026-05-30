const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");


const app = express();


// DATABASE

connectDB();


// MIDDLEWARE

app.use(cors());

// app.use(express.json());
app.use(express.json());


// ROUTES

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Blood Bank API Running");
});

app.post("/test", (req, res) => {
  console.log("BODY =", req.body);

  res.json({
    received: req.body
  });
});


// PORT

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});