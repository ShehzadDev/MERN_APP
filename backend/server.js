const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('./models/user.model');
const UserRoute=require('./routes/auth')
const ExerciseRoutes = require('./routes/exercises');

const app = express();
const port = process.env.PORT || 5000;

const mongoURI = process.env.ATLAS_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// UserModel instead of User
const User = UserModel;

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

// Add ExerciseRoutes
app.use('/exercises', ExerciseRoutes);
app.use('/auth',UserRoute)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
