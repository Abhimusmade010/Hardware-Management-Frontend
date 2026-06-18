import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { useAuth } from '../../context/AuthContext';
import { getMe, updateProfile, changePassword } from '../../api/auth';
import { getMyComplaints } from '../../api/complaint';
import { User, Mail, Phone, MapPin, Briefcase, Lock, Shield, Award, Edit3, CheckCircle, X } from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const { token, user: contextUser, login } = useAuth();
    const [user, setUser] = useState(contextUser);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, resolved: 0 });
    
    // Modes
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    
    // Form States
    const [profileData, setProfileData] = useState({
        Department: '',
        CabinNo: '',
        MobileNo: '',
        Specialization: '',
        Designation: ''
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
                // Fetch latest user details
                const userRes = await getMe(token);
                const fetchedUser = userRes.data?.data?.user || userRes.data?.user;
                if (fetchedUser) {
                    setUser(fetchedUser);
                    setProfileData({
                        Department: fetchedUser.Department || '',
                        CabinNo: fetchedUser.CabinNo || '',
                        MobileNo: fetchedUser.MobileNo || '',
                        Specialization: fetchedUser.Specialization || '',
                        Designation: fetchedUser.Designation || ''
                    });
                }

                // Fetch basic stats
                const compRes = await getMyComplaints(token);
                const complaints = compRes.data?.data?.complaints || compRes.data?.complaints || [];
                setStats({
                    total: complaints.length,
                    resolved: complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length
                });

            } catch (error) {
                console.error("Failed to load profile data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [token]);

    // Calculate profile completion percentage
    const baseFields = ['Name', 'Email', 'Department', 'CabinNo', 'MobileNo'];
    const profileFields = user?.Role === 'maintainance' ? [...baseFields, 'Specialization'] : [...baseFields, 'Designation'];
    const filledFields = profileFields.filter(field => user && user[field] && String(user[field]).trim() !== '');
    const completionPercentage = Math.round((filledFields.length / profileFields.length) * 100);

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
            // In the completeProfile backend controller, the updated user object is directly inside res.data.data
            const updatedUser = res.data?.data?.user || res.data?.user || res.data?.data;
            
            if (updatedUser) {
                setUser(updatedUser);
                // Sync AuthContext with updated user details
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
            <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] font-sans text-gray-900">
            <Toaster position="top-center" />
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Account Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your personal details and account security.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Avatar & Progress & Stats */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        
                        {/* Profile Summary Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center relative overflow-hidden">
                            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4 shadow-md">
                                {user?.Name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{user?.Name || 'User Account'}</h2>
                            <p className="text-gray-500 text-sm mb-4">{user?.Email}</p>
                            
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                                <Shield size={14} />
                                {user?.Role || 'User'} Role
                            </div>
                        </div>

                        {/* Completion Progress Card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                                    <p className="text-xs text-gray-500">Add details to complete your profile.</p>
                                </div>
                                <span className="text-xl font-bold text-gray-900">{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
                                <div className="bg-gray-900 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                            </div>
                            
                            {completionPercentage < 100 && (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
                                >
                                    Complete Profile Now
                                </button>
                            )}
                        </div>

                        {/* Account Stats */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Award size={18} className="text-gray-400" />
                                Account Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                    <span className="text-sm text-gray-500">Complaints Raised</span>
                                    <span className="font-semibold text-gray-900">{stats.total}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Issues Resolved</span>
                                    <span className="font-semibold text-green-600">{stats.resolved}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Security */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* Personal Details */}
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
                                    <form onSubmit={submitProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Department</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Briefcase size={16} /></div>
                                                <input type="text" name="Department" value={profileData.Department} onChange={handleProfileChange} placeholder="e.g. Computer Science" className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                            </div>
                                        </div>

                                        {user?.Role === 'maintainance' ? (
                                            <div>
                                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Specialization</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Award size={16} /></div>
                                                    <select name="Specialization" value={profileData.Specialization} onChange={handleProfileChange} className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors appearance-none cursor-pointer">
                                                        <option value="" disabled>Select Specialization</option>
                                                        <option value="Hardware">Hardware</option>
                                                        <option value="Software">Software</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Designation</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><User size={16} /></div>
                                                    <input type="text" name="Designation" value={profileData.Designation} onChange={handleProfileChange} placeholder="e.g. Assistant Professor" className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Mobile Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Phone size={16} /></div>
                                                <input type="text" name="MobileNo" value={profileData.MobileNo} onChange={handleProfileChange} placeholder="e.g. 9876543210" className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Cabin / Room No</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><MapPin size={16} /></div>
                                                <input type="text" name="CabinNo" value={profileData.CabinNo} onChange={handleProfileChange} placeholder="e.g. Room 402" className="w-full pl-10 pr-3 py-2 bg-[#edf2f7] border-transparent rounded-md text-[14px] focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-colors" />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 flex justify-end mt-2">
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
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Department</p>
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <Briefcase size={16} className="text-gray-400" />
                                                <span>{user?.Department || <span className="text-gray-400 italic">Not specified</span>}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Mobile Number</p>
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <Phone size={16} className="text-gray-400" />
                                                <span>{user?.MobileNo || <span className="text-gray-400 italic">Not specified</span>}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Cabin / Room No</p>
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <MapPin size={16} className="text-gray-400" />
                                                <span>{user?.CabinNo || <span className="text-gray-400 italic">Not specified</span>}</span>
                                            </div>
                                        </div>
                                        {user?.Role === 'maintainance' ? (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Specialization</p>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Award size={16} className="text-gray-400" />
                                                    <span>{user?.Specialization || <span className="text-gray-400 italic">Not specified</span>}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Designation</p>
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <User size={16} className="text-gray-400" />
                                                    <span>{user?.Designation || <span className="text-gray-400 italic">Not specified</span>}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Settings Card */}
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
            </main>

            {/* Password Change Modal */}
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
                                    <button 
                                        type="submit" 
                                        className="bg-[#111827] text-white hover:bg-gray-800 font-medium text-[14px] px-6 py-2.5 rounded-md transition-colors shadow-sm"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
