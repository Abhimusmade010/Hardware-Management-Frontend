import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardStats } from '../../api/admin';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'react-feather';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats(token);
                setStats(res.data.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };
        if(token) {
            fetchStats();
        }
    }, [token]);

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>;
    }

    const StatCard = ({ title, value, icon, color }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value || 0}</h3>
            </div>
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                <p className="text-gray-500">System wide complaint statistics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Total Complaints" 
                    value={stats?.totalComplaints} 
                    icon={<Activity size={24} className="text-blue-600" />}
                    color="bg-blue-50"
                />
                <StatCard 
                    title="Pending" 
                    value={stats?.inProgressCount} 
                    icon={<Clock size={24} className="text-yellow-600" />}
                    color="bg-yellow-50"
                />
                <StatCard 
                    title="Escalated" 
                    value={stats?.escalatedCount} 
                    icon={<AlertTriangle size={24} className="text-red-600" />}
                    color="bg-red-50"
                />
                <StatCard 
                    title="Resolved" 
                    value={stats?.resolvedCount } 
                    icon={<CheckCircle size={24} className="text-green-600" />}
                    color="bg-green-50"
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
