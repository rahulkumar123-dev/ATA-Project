// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TicketList from './pages/TicketList';
import NavBar from './components/NavBar';
import AuthRoute from './AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/" element={<AuthRoute><TicketList /></AuthRoute>} />
      </Routes>
    </>
  );
}

export default App;