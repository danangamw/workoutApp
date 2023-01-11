import express from 'express';
const router = express.Router();
import workoutController from '../controllers/workoutController.js';
import requiredAuth from '../middleware/auth.js';

// protect route
router.use(requiredAuth);

// Get all Workout
// Add workout
router
  .route('/')
  .get(workoutController.getWorkouts)
  .post(workoutController.createWorkout);

// Get Single Workout
// Update workout
// Delete workout
router
  .route('/:id')
  .get(workoutController.getSingleWorkout)
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

export default router;
