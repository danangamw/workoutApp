import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', userController.login);

// signup route
router.post('/signup', userController.signup);

export default router;
