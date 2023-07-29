const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// Route for getting all exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for getting all exercises for a specific user by ID
router.route('/:id').get((req, res) => {
    const userId = req.params.id;
  
    Exercise.find({ userId }) // Assuming you have a field 'userId' in the Exercise model
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Route for adding a new exercise
router.route('/add').post((req, res) => {
  const { username, description, duration, date } = req.body;
  const newExercise = new Exercise({ username, description, duration, date });

  newExercise.save()
    .then(() => res.json('Exercise added successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route for updating an exercise
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
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
router.route('/delete/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
