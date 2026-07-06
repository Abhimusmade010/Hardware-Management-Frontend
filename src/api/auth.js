import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_URL = `${BASE_URL}/auth`;

export const logUser = async (loginData) => {
    return await axios.post(`${API_URL}/login`, loginData);
};

export const signUpUser = async (signupData) => {
    return await axios.post(`${API_URL}/signup`, signupData);
};

export const getMe = async (token) => {
    return await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateProfile = async (profileData, token) => {
    return await axios.patch(`${API_URL}/complete-profile`, profileData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const changePassword = async (passwordData, token) => {
    return await axios.patch(`${API_URL}/change-password`, passwordData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
