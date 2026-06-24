import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { changePassword } from '../../api/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, LogOut } from 'react-feather';

const ForceChangePassword = () => {
    const { token, logout, login, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handlePasswordChange = (e) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitPasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("New passwords do not match.");
        }
        if (passwordData.newPassword.length < 6) {
            return toast.error("New password must be at least 6 characters.");
        }

        setLoading(true);
        try {
            await changePassword({ 
                currentPassword: passwordData.currentPassword, 
                newPassword: passwordData.newPassword 
            }, token);
            
            toast.success("Password changed successfully!");
            
            // Update user state in context to reflect mustChangePassword = false
            const updatedUser = { ...user, mustChangePassword: false };
            login(token, updatedUser);

            setTimeout(() => {
                const role = updatedUser?.Role || 'user';
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.error || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/user/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-4 py-8 font-sans text-gray-900">
            <Toaster position="top-center" />
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <Lock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Action Required</h3>
                    <p className="text-sm text-gray-500 mt-1 text-center">
                        For your security, you must change your temporary password before accessing the system.
                    </p>
                </div>
                <div className="p-6">
                    <form onSubmit={submitPasswordChange} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Current Temporary Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="w-full pl-10 pr-3 py-2.5 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" placeholder="••••••••" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required minLength={6} className="w-full pl-10 pr-3 py-2.5 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" placeholder="At least 6 characters" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required minLength={6} className="w-full pl-10 pr-3 py-2.5 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" placeholder="Confirm your new password" />
                            </div>
                        </div>

                        <div className="pt-2 flex flex-col gap-3">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-[#111827] text-white hover:bg-gray-800 font-medium text-[15px] py-2.5 rounded-md transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    "Update Password & Continue"
                                )}
                            </button>
                            <button 
                                type="button"
                                onClick={handleLogout}
                                className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-[14px] py-2.5 rounded-md transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForceChangePassword;
