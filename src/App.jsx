import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ExerciseList from './components/ExerciseList';
import AddExerciseForm from './components/AddExerciseForm';
import './App.css'; // Import the App.css file to apply the styles

export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation bar */}
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl text-white font-bold">Exercise Tracker App</h1>
            <ul className="flex space-x-4">
              <li>
                <Link className="text-white hover:text-gray-200" to="/exercises/add">New Exercise</Link>
              </li>
              <li>
                <Link className="text-white hover:text-gray-200" to="/exercises">Exercises</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="container mx-auto p-4">
          <Switch>
            <Route exact path="/exercises" component={ExerciseList} />
            <Route exact path="/exercises/add" component={AddExerciseForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
