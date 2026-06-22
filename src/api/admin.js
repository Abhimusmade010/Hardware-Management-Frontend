import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getDashboardStats = (token) => {
    return axios.get(`${API_URL}/dashboard/stats`, getAuthHeaders(token));
};

export const getDepartmentStats = (token) => {
    return axios.get(`${API_URL}/dashboard/department-stats`, getAuthHeaders(token));
};

export const getCategoryStats = (token) => {
    return axios.get(`${API_URL}/dashboard/category-stats`, getAuthHeaders(token));
};

export const createMaintenanceUser = (data, token) => {
    return axios.post(`${API_URL}/admin/create-maintenance`, data, getAuthHeaders(token));
};
