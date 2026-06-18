import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routePaths';
import { Home, List, PlusSquare, Settings, LogOut, ChevronDown } from 'react-feather';

const DashboardLayout = ({ children, title = "Dashboard" }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: ROUTES?.USER?.HOME || '/user/home', label: 'Overview', icon: Home },
        { path: '/user/complaints', label: 'My Complaints', icon: List },
        { path: '/user/raise', label: 'Raise Complaint', icon: PlusSquare },
        { path: '/user/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[260px] h-full border-r border-gray-200 flex flex-col bg-[#fcfcfc]">
                {/* Logo Area */}
                <div className="px-6 py-5 flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#111827] rounded-md flex items-center justify-center text-white">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <span className="font-semibold text-[15px]">College Portal.</span>
                </div>

                {/* Workspace / User info */}
                <div className="px-4 mb-6 mt-2">
                    <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-gray-900 text-white flex items-center justify-center font-medium text-sm">
                                {user?.Name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="text-left">
                                <p className="text-[14px] font-medium leading-tight">{user?.Name || 'User Account'}</p>
                                <p className="text-[12px] text-gray-500">{user?.Role === 'maintainance' ? 'Manager' : 'Student/Staff'}</p>
                            </div>
                        </div>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="px-4 flex-1">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Main Menu</p>
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${
                                        active 
                                            ? 'bg-gray-100 text-gray-900' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon size={16} className={active ? 'text-gray-900' : 'text-gray-500'} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200">
                    <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut size={16} className="text-gray-500" />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Topbar */}
                <header className="h-[60px] border-b border-gray-200 flex items-center px-8 bg-white shrink-0">
                    <div className="flex items-center text-[14px] text-gray-500">
                        <span className="text-gray-400">Portal</span>
                        <span className="mx-2">›</span>
                        <span className="text-gray-900 font-medium">{title}</span>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-white">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
