import api from './axiosInstance';

// raise complaint route
export const raiseComplaint = async (complaintData, token) => {
    return await api.post(`/complaints/raised-complaint`, complaintData);
};
// here get my complaints route 
export const getMyComplaints = async (token, params = {}) => {
    return await api.get(`/complaints/my-complaints`, {
        params
    });
};
// get all complaints stats
export const getMyStats = async (token) => {
    return await api.get(`/complaints/my-stats`);
};
// get categories stats
export const getTopCategories = async (token) => {
    return await api.get(`/complaints/top-categories`);
};
// get complaint details
export const getComplaintDetails = async (id, token) => {
    return await api.get(`/complaints/${id}`);
};
// add note to complaint
export const addNoteToComplaint = async (id, noteData, token) => {
    return await api.post(`/complaints/${id}/notes`, noteData);
};

// update complaint status (Maintenance/Admin only)
export const updateComplaintStatus = async (id, statusData, token) => {
    return await api.patch(`/complaints/${id}/status`, statusData);
};

export const submitReview = async (id, reviewData, token) => {
    return await api.post(`/complaints/${id}/reviews`, reviewData);
};

export const getReview = async (id, token) => {
    return await api.get(`/complaints/${id}/reviews`);
};
