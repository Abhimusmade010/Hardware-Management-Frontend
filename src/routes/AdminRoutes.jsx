import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/Layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddMaintenanceUser from '../pages/admin/AddMaintenanceUser';
import AdminProfile from '../pages/admin/AdminProfile';

const AdminRoutes = () => {
    const { token, user } = useAuth();

    // Protect admin routes
    if (!token) {
        return <Navigate to="/user/login" />;
    }

    if (user?.Role !== 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="add-maintenance" element={<AddMaintenanceUser />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
