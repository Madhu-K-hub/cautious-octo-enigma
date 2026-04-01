import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import octofitLogo from './logo.svg';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={octofitLogo} alt="Octofit Logo" className="octofit-logo me-2" />
            <span>Octofit Tracker</span>
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </div>
      </nav>
      <div className="container-fluid bg-light min-vh-100 py-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<div className="container mt-4"><h1 className="text-primary">Welcome to Octofit Tracker</h1><p className="lead text-secondary">Select a section to view live API data.</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
