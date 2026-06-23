import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMe, updateProfile, changePassword } from '../../api/auth';
import { User, Mail, Phone, Lock, Shield, Edit3, CheckCircle, X } from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';

const AdminProfile = () => {
    const { token, user: contextUser, login } = useAuth();
    const [user, setUser] = useState(contextUser);
    const [loading, setLoading] = useState(true);
    
    // Modes
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    
    // Form States
    const [profileData, setProfileData] = useState({
        MobileNo: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!token) return;
            try {
                const userRes = await getMe(token);
                const fetchedUser = userRes.data?.data?.user || userRes.data?.user;
                if (fetchedUser) {
                    setUser(fetchedUser);
                    setProfileData({
                        MobileNo: fetchedUser.MobileNo || ''
                    });
                }
            } catch (error) {
                console.error("Failed to load profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [token]);

    const handleProfileChange = (e) => {
        setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePasswordChange = (e) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile(profileData, token);
            const updatedUser = res.data?.data?.user || res.data?.user || res.data?.data;
            
            if (updatedUser) {
                setUser(updatedUser);
                login(token, updatedUser);
            }
            
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.error || "Failed to update profile.");
        }
    };

    const submitPasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("New passwords do not match.");
        }
        if (passwordData.newPassword.length < 6) {
            return toast.error("New password must be at least 6 characters.");
        }

        try {
            await changePassword({ 
                currentPassword: passwordData.currentPassword, 
                newPassword: passwordData.newPassword 
            }, token);
            
            toast.success("Password changed successfully!");
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setIsPasswordModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.error || "Failed to change password.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <Toaster position="top-center" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
                <p className="text-gray-500 mt-1">Manage your administrator details and account security.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center relative overflow-hidden">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4 shadow-md">
                            {user?.Name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.Name || 'Administrator'}</h2>
                        <p className="text-gray-500 text-sm mb-4">{user?.Email}</p>
                        
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                            <Shield size={14} />
                            {user?.Role || 'Admin'} Role
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 text-sm font-medium"
                            >
                                {isEditing ? 'Cancel Edit' : <><Edit3 size={16} /> Edit Profile</>}
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {isEditing ? (
                                <form onSubmit={submitProfileUpdate} className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Mobile Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Phone size={16} /></div>
                                            <input type="text" name="MobileNo" value={profileData.MobileNo} onChange={handleProfileChange} placeholder="e.g. 9876543210" className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-2">
                                        <button type="submit" className="bg-[#111827] hover:bg-gray-800 text-white font-medium text-[14px] px-6 py-2.5 rounded-md transition-colors shadow-sm">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>{user?.Email}</span>
                                            <CheckCircle size={14} className="text-green-500 ml-1" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Mobile Number</p>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>{user?.MobileNo || <span className="text-gray-400 italic">Not specified</span>}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                                <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure.</p>
                            </div>
                            <button 
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 font-medium text-[14px] px-5 py-2 rounded-md transition-colors shadow-sm whitespace-nowrap"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative transform transition-all">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                            <button 
                                onClick={() => {
                                    setIsPasswordModalOpen(false);
                                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                }} 
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={submitPasswordChange} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Current Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required minLength={6} className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={16} /></div>
                                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required minLength={6} className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setIsPasswordModalOpen(false);
                                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                        }}
                                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-[14px] px-5 py-2.5 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                                        <span className="text-red-500 text-[13px] font-medium self-center mr-2">Passwords do not match</span>
                                    )}
                                    {passwordData.newPassword.length >= 6 && passwordData.newPassword === passwordData.confirmPassword && (
                                        <button 
                                            type="submit" 
                                            className="bg-[#111827] text-white hover:bg-gray-800 font-medium text-[14px] px-6 py-2.5 rounded-md transition-colors shadow-sm"
                                        >
                                            Update Password
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
