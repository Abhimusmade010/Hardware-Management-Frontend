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
