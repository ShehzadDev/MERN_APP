import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddExerciseForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    duration: 0,
    date: new Date().toISOString().slice(0, 10), // Initialize with today's date
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    try {
      const response = await axios.post('http://localhost:5000/exercises/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      console.log(response.data);
      history.push('/exercises'); // Redirect to exercises page on successful add
    } catch (error) {
      console.error('Add exercise error:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block font-medium mb-2">
            Duration (in minutes):
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Exercise
        </button>
      </form>
    </div>
  );
};

export default AddExerciseForm;
