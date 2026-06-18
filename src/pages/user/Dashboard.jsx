import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints } from '../../api/complaint';
import { Link } from 'react-router-dom';
import { Grid, Clock, CheckCircle, List, ArrowRight, Plus } from 'react-feather';
import Navbar from '../../components/Layouts/Navbar';

const Dashboard = () => {
    const { user, token } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            if (!token) return;
            try {
                const res = await getMyComplaints(token);
                // Backend may return complaints in res.data.data.complaints or similar
                const data = res.data?.data?.complaints || res.data?.complaints || [];
                setComplaints(data);
            } catch (err) {
                console.error("Failed to fetch complaints:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, [token]);

    // Calculate basic stats from fetched complaints
    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed').length;
    const resolvedComplaints = complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;

    // Get the 5 most recent complaints
    const recentComplaints = [...complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    const getStatusStyle = (status) => {
        switch(status?.toLowerCase()) {
            case 'resolved':
            case 'closed':
                return 'bg-green-100 text-green-700';
            case 'assigned':
            case 'in-progress':
            case 'escalated':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] font-sans text-gray-900">
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Information / Hero Section */}
                <section className="mb-12">
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.Name?.split(' ')[0] || 'User'}!
                            </h1>
                            <p className="text-gray-500 text-[16px] leading-relaxed mb-6">
                                This is your personal dashboard for tracking and managing hardware or software issues across the college campus. You can easily raise new tickets, monitor the status of ongoing repairs, and keep your department running smoothly.
                            </p>
                            <Link 
                                to="/user/raise" 
                                className="inline-flex items-center gap-2 bg-[#111827] text-white px-5 py-2.5 rounded-lg font-medium text-[15px] hover:bg-gray-800 transition-colors shadow-md"
                            >
                                <Plus size={18} />
                                File a New Issue
                            </Link>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                            <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2" fill="none"></polyline>
                                <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2"></line>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <List size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Filed</p>
                            <h3 className="text-3xl font-bold text-gray-900">{loading ? '-' : totalComplaints}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                            <h3 className="text-3xl font-bold text-gray-900">{loading ? '-' : pendingComplaints}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Resolved</p>
                            <h3 className="text-3xl font-bold text-gray-900">{loading ? '-' : resolvedComplaints}</h3>
                        </div>
                    </div>
                </section>

                {/* Recent Complaints */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Grid size={20} className="text-gray-400" />
                            Recent Complaints
                        </h2>
                        {complaints.length > 5 && (
                            <Link to="/user/complaints" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                View All <ArrowRight size={16} />
                            </Link>
                        )}
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="p-12 flex justify-center items-center">
                                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                            </div>
                        ) : recentComplaints.length === 0 ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                    <List size={28} className="text-gray-400" />
                                </div>
                                <h3 className="text-[16px] font-medium text-gray-900 mb-1">No complaints found</h3>
                                <p className="text-[15px] text-gray-500 max-w-sm mb-6">
                                    You haven't submitted any complaints yet. When you do, they'll appear right here for easy tracking.
                                </p>
                                <Link 
                                    to="/user/raise" 
                                    className="text-gray-900 border border-gray-300 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-colors"
                                >
                                    Raise your first ticket
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                            <th className="p-4 pl-6">ID / Asset</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Description</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4 pr-6 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentComplaints.map((complaint) => (
                                            <tr key={complaint._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 pl-6">
                                                    <span className="font-medium text-gray-900">#{complaint.assetId}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                        {complaint.category}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
                                                    {complaint.description}
                                                </td>
                                                <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                                                    {new Date(complaint.createdAt).toLocaleDateString(undefined, {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="p-4 pr-6 text-right whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(complaint.status)}`}>
                                                        {complaint.status || 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        College Portal.
                    </div>
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} College Hardware Support System. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
