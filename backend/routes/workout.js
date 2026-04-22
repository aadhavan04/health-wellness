const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");


router.post("/add", async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.json(workout);
});


router.get("/:userId", async (req, res) => {
  const data = await Workout.find({ userId: req.params.userId });
  res.json(data);
});

module.exports = router; 