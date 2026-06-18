import axios from 'axios';

// Pointing to your server endpoint
const API_URL = 'http://localhost:3001/api/complaints';

export const raiseComplaint = async (complaintData, token) => {
    return await axios.post(`${API_URL}/raised-complaint`, complaintData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMyComplaints = async (token) => {
    return await axios.get(`${API_URL}/my-complaints`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMyStats = async (token) => {
    return await axios.get(`${API_URL}/my-stats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getTopCategories = async (token) => {
    return await axios.get(`${API_URL}/top-categories`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getComplaintDetails = async (id, token) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const addNoteToComplaint = async (id, noteData, token) => {
    return await axios.post(`${API_URL}/${id}/notes`, noteData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
