import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AddExerciseForm() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExercise = {
      username,
      description,
      duration: Number(duration),
      date: Date.parse(date)
    };

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    axios.post('http://localhost:5000/exercises/add', newExercise, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    })
      .then(response => {
        console.log(response.data);
        // Redirect to the "exercises" page after successful insertion
        history.push('/exercises');
      })
      .catch(error => {
        console.error('Error adding exercise:', error);
      });

    setUsername('');
    setDescription('');
    setDuration('');
    setDate('');
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter exercise description"
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in minutes"
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md">
          Add Exercise
        </button>
      </form>
    </div>
  );
}
