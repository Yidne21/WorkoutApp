const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};
//get single workouts
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
//create a new workouts
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!load) {
    emptyFields.push("load");
  }
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }
  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a workouts
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete({_id: id});

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
//update a workouts

const updateWorkout = async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findByIdAndUpdate({_id: id}, {
    ...req.body
  })

  res.status(200).json(workout);
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
