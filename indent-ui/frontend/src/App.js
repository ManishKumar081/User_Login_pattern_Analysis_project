import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IndentForm from './pages/IndentForm';
import IndentVerification from './pages/IndentVerification';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">

        {/* Top Navigation Bar */}
        <nav className="navbar">
          <div className="nav-brand">
            📋 Indent Management System
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">New Indent</Link>
            <Link to="/verify" className="nav-link">Verification</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<IndentForm />} />
            <Route path="/verify" element={<IndentVerification />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;