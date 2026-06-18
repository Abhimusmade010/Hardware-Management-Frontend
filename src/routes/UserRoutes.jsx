import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/user/Home';
import Dashboard from '../pages/user/Dashboard';
import RaiseComplaint from '../pages/user/RaiseComplaint';
import Profile from '../pages/user/Profile';
import ComplaintDetails from '../pages/user/ComplaintDetails';

const Placeholder = ({ title }) => <div className="p-8 text-center text-xl font-medium">{title} Page (Coming Soon)</div>;

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="raise" element={<RaiseComplaint />} />
      <Route path="profile" element={<Profile />} />
      <Route path="complaints/:id" element={<ComplaintDetails />} />
      {/* Catch-all route to redirect back to login if they enter a non-existent path */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default UserRoutes;
