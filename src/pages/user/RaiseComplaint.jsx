import React, { useState } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { useAuth } from '../../context/AuthContext';
import { raiseComplaint } from '../../api/complaint';
import toast, { Toaster } from 'react-hot-toast';
import { Loader, Monitor, AlignLeft, AlertTriangle, AlertCircle, CheckCircle, Image as ImageIcon, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const RaiseComplaint = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submittedComplaint, setSubmittedComplaint] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [formData, setFormData] = useState({
        assetId: '',
        category: 'Hardware',
        priority: 'Medium',
        description: ''
    });
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
            setMediaPreview(URL.createObjectURL(file));
        }
    };

    const removeMedia = () => {
        setMediaFile(null);
        setMediaPreview(null);
    };

    // const validateForm = () => {
    //     if (!formData.assetId || !formData.description) {
    //         setError('Asset ID and Description are required.');
    //         return false;
    //     }
    //     if (isNaN(Number(formData.assetId))) {
    //         setError('Asset ID must be a number.');
    //         setMediaPreview(null);
    //     }   
    // };


    const validateForm = () => {
        if (!formData.assetId || !formData.description) {
            setError('Asset ID and Description are required.');
            return false;
        }
        if (isNaN(Number(formData.assetId))) {
            setError('Asset ID must be a number.');
            return false;
        }
        return true;
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setShowConfirmModal(true);
    };

    const confirmSubmit = async () => {
        setShowConfirmModal(false);
        setLoading(true);
        setError('');

        try {
            let payload;
            if (mediaFile) {
                payload = new FormData();
                payload.append('assetId', Number(formData.assetId));
                payload.append('category', formData.category);
                payload.append('priority', formData.priority);
                payload.append('description', formData.description);
                payload.append('media', mediaFile);
            } else {
                // Convert assetId to number as per backend schema
                payload = {
                    ...formData,
                    assetId: Number(formData.assetId)
                };
            }

            const res = await raiseComplaint(payload, token);
            toast.success('Complaint submitted successfully!');
            
            const newComplaint = res.data?.data?.complaint || res.data?.complaint;
            setSubmittedComplaint(newComplaint || payload);

        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to submit complaint. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] font-sans text-gray-900">
            <Toaster position="top-center" />
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-900">Raise a New Complaint</h1>
                    <p className="text-[15px] text-gray-500 mt-1">Please provide the details of the issue you are facing so we can help you faster.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[14px] rounded-md flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white border border-gray-200 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden">
                    <form onSubmit={handleInitialSubmit} className="p-8 flex flex-col gap-6">
                        
                        {/* Row 1: Asset ID & Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Asset ID</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Monitor size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="assetId"
                                        placeholder="e.g. 10452"
                                        value={formData.assetId}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-[#edf2f7] border border-transparent text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 bg-[#edf2f7] border border-transparent text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 2: Priority */}
                        <div>
                            <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Priority Level</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <AlertTriangle size={18} />
                                </div>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#edf2f7] border border-transparent text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Description */}
                        <div>
                            <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Description</label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-3 pointer-events-none text-gray-400">
                                    <AlignLeft size={18} />
                                </div>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Describe the issue in detail..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#edf2f7] border border-transparent text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors resize-y"
                                ></textarea>
                            </div>
                        </div>

                        {/* Row 4: Media Upload */}
                        <div>
                            <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Attach Media (Image/Video)</label>
                            
                            {!mediaFile ? (
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-[#edf2f7] hover:bg-gray-200 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 justify-center mt-2">
                                            <label className="relative cursor-pointer rounded-md font-medium text-[#111827] hover:text-gray-700 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input name="media" type="file" className="sr-only" onChange={handleMediaChange} accept="image/*,video/*" />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-1 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200 inline-block">
                                    {mediaFile.type.startsWith("image/") ? (
                                        <img
                                            src={mediaPreview}
                                            alt="Preview"
                                            className="max-h-48 object-contain"
                                        />
                                    ) : (
                                        <video
                                            controls
                                            className="max-h-48 object-contain"
                                        >
                                            <source
                                                src={mediaPreview}
                                                type={mediaFile.type}
                                            />
                                            Your browser does not support video.
                                        </video>
                                    )}
                                    <button
                                        type="button"
                                        onClick={removeMedia}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                                    >
                                        <X size={16}/>
                                    </button>
                                </div>
                            )}
                        </div>


                        
                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100 mt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/user/home')}
                                className="px-4 py-2.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#111827] hover:bg-[#374151] text-white font-medium text-[15px] px-6 py-2.5 rounded-md transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Submit Complaint</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-8 transform transition-all scale-100 opacity-100">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-5">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Submission</h3>
                        <p className="text-[15px] text-gray-500 mb-6">
                            Are you sure you want to submit this complaint?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-lg transition-colors"
                            >
                                No
                            </button>
                            <button 
                                onClick={confirmSubmit}
                                className="w-full bg-[#111827] hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {submittedComplaint && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-8 transform transition-all scale-100 opacity-100">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Complaint Submitted!</h3>
                        <p className="text-[15px] text-gray-500 mb-6">
                            Your issue has been successfully logged.
                            <br />
                            Asset ID: <span className="font-semibold text-gray-900">#{submittedComplaint.assetId}</span>
                        </p>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => navigate('/user/dashboard')} 
                                className="w-full bg-[#111827] text-white py-2.5 rounded-lg font-medium text-[15px] hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                Track Issue
                            </button>
                            <button 
                                onClick={() => { 
                                    setSubmittedComplaint(null); 
                                    setFormData({assetId: '', category: 'Hardware', priority: 'Medium', description: ''}); 
                                    removeMedia();
                                }} 
                                className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-[15px] hover:bg-gray-50 transition-colors"
                            >
                                Raise Another Complaint
                            </button>
                            <button 
                                onClick={() => navigate('/user/home')} 
                                className="w-full text-gray-500 hover:text-gray-900 text-[14px] font-medium py-2 mt-1 transition-colors"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </main>
        </div>
    );
};

export default RaiseComplaint;
