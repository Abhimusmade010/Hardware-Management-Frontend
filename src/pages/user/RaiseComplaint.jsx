import React, { useState } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { raiseComplaint } from '../../api/complaint';
import toast, { Toaster } from 'react-hot-toast';
import { Loader, Monitor, AlignLeft, AlertTriangle, AlertCircle } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const RaiseComplaint = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        assetId: '',
        category: 'Hardware',
        priority: 'Medium',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            // Convert assetId to number as per backend schema
            const payload = {
                ...formData,
                assetId: Number(formData.assetId)
            };

            await raiseComplaint(payload, token);
            toast.success('Complaint submitted successfully!');
            
            setTimeout(() => {
                navigate('/user/home');
            }, 1000);

        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to submit complaint. Please try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout title="Raise Complaint">
            <Toaster position="top-center" />
            
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
                    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                        
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
        </DashboardLayout>
    );
};

export default RaiseComplaint;
