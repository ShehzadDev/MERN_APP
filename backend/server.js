// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const mongoURI = process.env.ATLAS_URI;

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



// Routes
const exercisesRouter = require('./routes/exercises');
// Use routes
app.use('/exercises', exercisesRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
