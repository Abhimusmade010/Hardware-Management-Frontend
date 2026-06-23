import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, UserPlus, LogOut, Settings, User } from 'react-feather';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/user/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
        { path: '/admin/add-maintenance', icon: <UserPlus size={20} />, label: 'Add Engineer' },
        { path: '/admin/profile', icon: <User size={20} />, label: 'Profile' },
    ];

    return (
        <div className="flex h-screen bg-[#f9fafb] font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Settings className="text-blue-400" /> Admin Portal
                    </h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                location.pathname === item.path
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium text-[15px]">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium text-[15px]">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Admin Portal'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                            A
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
