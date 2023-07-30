const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Exercise = require('../models/exercise.model');
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // Assuming you have a field 'userId' in the decoded token
    const userId = decodedToken.userId;
    if (!userId) return res.status(403).json({ message: 'Invalid user data in token' });

    req.user = { userId };
    next();
  });
};

// Route for getting all exercises
router.route('/').get(authenticateUser, (req, res) => {
  Exercise.find({ userId: req.user.userId })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for adding a new exercise
router.route('/add').post(authenticateUser, (req, res) => {
  const { description, duration, date } = req.body;
  const newExercise = new Exercise({ userId: req.user.userId, description, duration, date });

  newExercise.save()
    .then(() => res.json('Exercise added successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for updating an exercise
router.route('/update/:id').post(authenticateUser, (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise.userId !== req.user.userId) {
        return res.status(403).json({ message: 'You are not authorized to update this exercise' });
      }

      exercise.description = req.body.description;
      exercise.duration = req.body.duration;
      exercise.date = req.body.date;
      exercise.save()
        .then(() => res.json('Exercise updated successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for deleting an exercise
router.route('/delete/:id').delete(authenticateUser, (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise.userId !== req.user.userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this exercise' });
      }

      exercise.delete()
        .then(() => res.json('Exercise deleted successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
