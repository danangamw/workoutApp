import Workout from '../models/Workout.js';
import mongoose from 'mongoose';

// get all workout
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  // check if id type of mongodb object
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'Workout not found!' });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;

  let emptyFields = [];

  // validate user input
  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  // add to db
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // check if id type of mongodb object
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(404).json({ error: 'Workout not found!' });
  }

  res.status(200).json(workout);
};

// update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // check if id type of mongodb object
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout!' });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!workout) {
    return res.status(404).json({ error: 'Workout not found!' });
  }

  res.status(200).json(workout);
};

export default {
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
  createWorkout,
};
