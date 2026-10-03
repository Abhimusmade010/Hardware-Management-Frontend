import api from './axiosInstance';

export const logUser = async (loginData) => {
    return await api.post(`/auth/login`, loginData);
};

export const signUpUser = async (signupData) => {
    return await api.post(`/auth/signup`, signupData);
};

export const getMe = async (token) => {
    return await api.get(`/auth/me`);
};

export const updateProfile = async (profileData, token) => {
    return await api.patch(`/auth/complete-profile`, profileData);
};

export const changePassword = async (passwordData, token) => {
    return await api.patch(`/auth/change-password`, passwordData);
};
