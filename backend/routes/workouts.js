const { Router } = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");
const express = require("express");
const router = express.Router();

//GET all workouts
router.get("/", getWorkouts);

//GET a single workouts
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);

//DELETE a workouts
router.delete("/:id", deleteWorkout);

//Update a workouts
router.patch("/:id", updateWorkout);

module.exports = router;
