import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createMaintenanceUser } from '../../api/admin';
import toast, { Toaster } from 'react-hot-toast';
import { User, Mail, Lock, Briefcase } from 'react-feather';

const AddMaintenanceUser = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        department: 'Hardware'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createMaintenanceUser(formData, token);
            toast.success('Maintenance Engineer added successfully!');
            setFormData({ Name: '', Email: '', department: 'Hardware' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add engineer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <Toaster position="top-center" />
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Add Maintenance Engineer</h2>
                <p className="text-gray-500">Create a new account for maintenance staff.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                placeholder="john.doe@college.edu"
                            />
                        </div>
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase size={18} className="text-gray-400" />
                            </div>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                            >
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#111827] text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span>Create Account</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMaintenanceUser;
