import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [editingExerciseId, setEditingExerciseId] = useState('');
  const [editingExerciseData, setEditingExerciseData] = useState({});

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Fetch the exercises using the API endpoint
    axios
      .get('http://localhost:5000/exercises', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  const handleDelete = (exerciseId) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
  
    // Delete the exercise using the API endpoint
    axios
      .delete(`http://localhost:5000/exercises/${exerciseId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((response) => {
        console.log(response.data);
        // Remove the deleted exercise from the list
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise._id !== exerciseId)
        );
      })
      .catch((error) => {
        console.error('Error deleting exercise:', error);
      });
  };
  

  const handleEdit = (exerciseId, exerciseData) => {
    setEditingExerciseId(exerciseId);
    setEditingExerciseData(exerciseData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Update the exercise using the API endpoint
    axios
      .post(`http://localhost:5000/exercises/update/${editingExerciseId}`, editingExerciseData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
      .then((response) => {
        console.log(response.data);
        setEditingExerciseId('');
        setEditingExerciseData({});
        // Optionally, you can update the exercise list after updating an exercise
      })
      .catch((error) => {
        console.error('Error updating exercise:', error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id} className="flex justify-between items-center mb-2">
            {editingExerciseId === exercise._id ? (
              <form onSubmit={handleUpdate} className="flex space-x-2">
                {/* Input fields to edit exercise data */}
                <input
                  type="text"
                  value={editingExerciseData.description || ''}
                  onChange={(e) =>
                    setEditingExerciseData({ ...editingExerciseData, description: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-1 w-60"
                />
                <input
                  type="text"
                  value={editingExerciseData.duration || ''}
                  onChange={(e) =>
                    setEditingExerciseData({ ...editingExerciseData, duration: e.target.value })
                  }
                  className="border border-gray-300 rounded-md p-1 w-60"
                />

                <button
                  type="submit"
                  className="text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg"
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                {/* Display exercise details */}
                <div className="exercise-details">
                  <span className="description">Description: {exercise.description}</span>
                  <span className="duration">Duration: {exercise.duration} minutes</span>
                  <span className="date">Date: {new Date(exercise.date).toLocaleDateString()}</span>
                </div>
                <hr className="my-2 border-gray-300" />
              </div>
            )}
            <div className="flex space-x-2">
              {editingExerciseId === exercise._id ? null : (
                <button
                  onClick={() => handleEdit(exercise._id, exercise)}
                  className="text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(exercise._id)}
                className="text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
