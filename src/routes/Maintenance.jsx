import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Placeholder = ({ title }) => <div className="p-8 text-center text-xl font-medium">{title} Page (Coming Soon)</div>;

const MaintenanceRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Placeholder title="Maintenance Login" />} />
      <Route path="dashboard" element={<Placeholder title="Maintenance Dashboard" />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default MaintenanceRoutes;
