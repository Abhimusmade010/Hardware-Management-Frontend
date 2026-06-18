import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Plus, User, Bell } from 'react-feather';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/user/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/user/home')}>
                        <div className="w-8 h-8 bg-[#111827] rounded-md flex items-center justify-center text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16 6 12 2 8 6"></polyline>
                                <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                        </div>
                        <span className="font-semibold text-lg tracking-tight">College Complaint Portal.</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 h-full">
                        <Link to="/user/home" className={`font-medium h-full flex items-center transition-colors ${isActive('/user/home') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                            Home
                        </Link>
                        <Link to="/user/dashboard" className={`font-medium h-full flex items-center transition-colors ${isActive('/user/dashboard') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                            Dashboard
                        </Link>
                        <Link to="/user/profile" className={`font-medium h-full flex items-center gap-1.5 transition-colors ${isActive('/user/profile') ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                            <User size={18} />
                            Profile
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-900 transition-colors relative" title="Notifications">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <Link 
                            to="/user/raise" 
                            className="hidden sm:flex items-center gap-2 bg-[#111827] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors"
                        >
                            <Plus size={16} />
                            Raise Complaint
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="text-gray-500 hover:text-red-600 transition-colors p-2"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
