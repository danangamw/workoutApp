import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import url from 'url';

import workoutRoute from './routes/workout.js';
import userRoute from './routes/user.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// log
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.use('/api/workouts', workoutRoute);
app.use('/api/user', userRoute);

// connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to database`);
    // listen to port
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });
