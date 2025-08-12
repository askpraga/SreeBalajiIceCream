import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';

export default function App(){
  return (
    <Router>
      <div style={{padding:20}}>
        <h2>Sree Balaji Ice Cream — Prototype</h2>
        <nav>
          <Link to="/">Home</Link> | <Link to="/pos">POS</Link> | <Link to="/inventory">Inventory</Link> | <Link to="/attendance">Attendance</Link> | <Link to="/login">Login</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/pos" element={<POS/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/attendance" element={<Attendance/>} />
        </Routes>
      </div>
    </Router>
  );
}
