const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express(); 

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const workoutRoutes = require("./routes/workout");
app.use("/api/workout", workoutRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/healthApp")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
  res.send("Backend working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
