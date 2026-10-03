import api from './axiosInstance';

export const getDashboardStats = (token) => {
    return api.get(`/dashboard/stats`);
};

export const getDepartmentStats = (token) => {
    return api.get(`/dashboard/department-stats`);
};

export const getCategoryStats = (token) => {
    return api.get(`/dashboard/category-stats`);
};

export const createMaintenanceUser = (data, token) => {
    return api.post(`/admin/create-maintenance`, data);
};

export const getMaintenanceEngineers = (token) => {
    return api.get(`/admin/engineers`);
};

export const downloadExcelSheet = (token, params = {}) => {
    return api.get(`/dashboard/downloadSheet`, {
        params,
        responseType: 'blob'
    });
};

