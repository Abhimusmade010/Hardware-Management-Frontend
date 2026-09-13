import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints, addNoteToComplaint, getMyStats } from '../../api/complaint';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Clock, CheckCircle, List, ArrowRight, Search, Filter, MessageSquare, X, Send, Download, Eye } from 'react-feather';
import Navbar from '../../components/Layouts/Navbar';
import { downloadExcelSheet } from '../../api/admin';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Stats State
    const [stats, setStats] = useState({ total: '-', pending: '-', resolved: '-' });

    // Note Modal States
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [noteMessage, setNoteMessage] = useState("");
    const [submittingNote, setSubmittingNote] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
             if (!token) return;
             try {
                 const res = await getMyStats(token);
                 const s = res.data?.data?.stats;
                 if (s) {
                     setStats({
                         total: s.total || 0,
                         pending: s.pending || 0,
                         resolved: (s.resolved || 0) + (s.closed || 0)
                     });
                 }
             } catch(err) {}
        };
        fetchStats();
    }, [token]);

    const fetchComplaints = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit,
                search: searchQuery,
                status: statusFilter,
                category: categoryFilter
                
            };
            const res = await getMyComplaints(token, params);
            const data = res.data?.data?.complaints || res.data?.complaints || [];
            setComplaints(data);
            if (res.data?.pagination) {
                setTotalPages(res.data.pagination.pages);
            }
        } catch (err) {
            console.error("Failed to fetch complaints:", err);
            toast.error("Failed to load complaints");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [token, currentPage, searchQuery, statusFilter, categoryFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, categoryFilter]);

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

    const openNoteModal = (complaint) => {
        setSelectedComplaint(complaint);
        setIsNoteModalOpen(true);
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        if (!noteMessage.trim()) return;

        setSubmittingNote(true);
        try {
            await addNoteToComplaint(selectedComplaint._id, { message: noteMessage }, token);
            toast.success("Note added successfully!");
            setNoteMessage("");
            
            // Refresh complaints with current pagination and filters
            await fetchComplaints();
            
            // Update selected complaint for live modal refresh
            // Since fetchComplaints updates state asynchronously, we can either
            // wait for it or just fetch the single complaint. For now we will rely on
            // the state update or fetch single if needed.
            // A quick fix is to append the note locally to the selectedComplaint
            setSelectedComplaint(prev => ({
                ...prev,
                notes: [...(prev.notes || []), {
                    message: noteMessage,
                    addedBy: user?.Role || 'user',
                    createdAt: new Date().toISOString()
                }]
            }));
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add note");
        } finally {
            setSubmittingNote(false);
        }
    };

    const handleDownloadExcel = async () => {
        try {
            const params = {
                search: searchQuery,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                category: categoryFilter !== 'all' ? categoryFilter : undefined
            };
            const response = await downloadExcelSheet(token, params);
            
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Complaints.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success("Excel sheet downloaded successfully!");
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("Failed to download excel sheet");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] font-sans text-gray-900">
            <Toaster position="top-center" />
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Quick Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        {/* <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <List size={24} />
                        </div> */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Filed</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.total}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        {/* <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                            <Clock size={24} />
                        </div> */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.pending}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                        {/* <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div> */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Resolved</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.resolved}</h3>
                        </div>
                    </div>
                </section>

                {/* Complaints Section */}
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            {/* <Grid size={20} className="text-gray-400" /> */}
                            Your Complaints
                        </h2>
                        
                        {/* Search & Filters */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Search asset or desc..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            {user?.Role !== 'maintainance' && (
                                <div className="relative">
                                    {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter size={16} className="text-gray-400" />
                                    </div> */}
                                    <select 
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="pl-9 pr-8 py-2 w-full sm:w-auto border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="hardware">Hardware</option>
                                        <option value="software">Software</option>
                                    </select>
                                </div>
                            )}
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 w-full sm:w-auto border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="assigned">Assigned</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="escalated">Escalated</option>
                            </select>
                            <button
                                onClick={handleDownloadExcel}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap"
                            >
                                <Download size={16} />
                                Export
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="p-12 flex justify-center items-center">
                                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                            </div>
                        ) : complaints.length === 0 ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                    <List size={28} className="text-gray-400" />
                                </div>
                                <h3 className="text-[16px] font-medium text-gray-900 mb-1">No complaints found</h3>
                                <p className="text-[15px] text-gray-500 max-w-sm mb-6">
                                    {user?.Role === 'maintainance' 
                                        ? "There are currently no complaints assigned to your department." 
                                        : "Try adjusting your search or filters, or raise a new ticket if you have an issue."}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200 text-[13px] font-medium text-gray-500 uppercase tracking-wider">
                                            <th className="p-4 pl-6">ID / Asset</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4 hidden sm:table-cell">Description</th>
                                            {/* <th className="p-4">Date</th> */}
                                            <th className="p-4 text-center">Status</th>

                                            {/* =====================added new  =======================*/}
                                            <th className="p-4 text-center">Priority</th>
                                            {user?.Role !== 'maintainance' && (
                                                <th className="p-4 text-center">AssignedTo</th>
                                            )}
                                            
                                            <th className="p-4 pr-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {complaints.map((complaint) => (
                                            <tr 
                                                key={complaint._id} 
                                                onClick={() => navigate(`/user/complaints/${complaint._id}`)}
                                                className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                <td className="p-4 pl-6">
                                                    <span className="font-medium text-gray-900">#{complaint.assetId}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                        {complaint.category}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-600 text-sm max-w-xs truncate hidden sm:table-cell">
                                                    {complaint.description}
                                                </td>
                                                {/* <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                                                    {new Date(complaint.createdAt).toLocaleDateString(undefined, {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    })}
                                                </td> */}
                                                <td className="p-4 text-center whitespace-nowrap">
                                                    <div className="flex flex-col items-center justify-center gap-1.5">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(complaint.status)}`}>
                                                            {complaint.status || 'Pending'}
                                                        </span>
                                                        {complaint.seenByManager && user?.Role !== 'maintainance' && (
                                                            <span className="flex items-center gap-1 text-[10px] text-purple-600 font-medium bg-purple-50 px-1.5 py-0.5 rounded-full border border-purple-100">
                                                                <Eye size={10} /> Seen
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>


                                                <td className="p-4 text-center whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                        {complaint.priority}
                                                    </span>
                                                </td>

                                                {user?.Role !== 'maintainance' && (
                                                    <td className="p-4 text-center whitespace-nowrap">
                                                        {complaint.assignedTo ? (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                                                {complaint.assignedTo.Email}
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                                                Not Assigned
                                                            </span>
                                                        )}
                                                    </td>
                                                )}
                                                

                                                <td className="p-4 pr-6 text-right">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openNoteModal(complaint);
                                                        }}
                                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
                                                    >
                                                        <MessageSquare size={16} />
                                                        <span className="hidden sm:inline">Notes</span>
                                                        {complaint.notes?.length > 0 && (
                                                            <span className="bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-1">
                                                                {complaint.notes.length}
                                                            </span>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                                        <button 
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-sm text-gray-500">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button 
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Note Popup Modal */}
            {isNoteModalOpen && selectedComplaint && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
                        {/* Modal Header */}
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    Complaint #{selectedComplaint.assetId}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Current Status: <span className="capitalize font-medium text-gray-700">{selectedComplaint.status}</span>
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsNoteModalOpen(false)} 
                                className="text-gray-400 hover:text-gray-900 bg-white p-1.5 rounded-full shadow-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Existing Notes Chat Area */}
                        <div className="p-5 flex-1 overflow-y-auto bg-white flex flex-col gap-4">
                            {(!selectedComplaint.notes || selectedComplaint.notes.length === 0) ? (
                                <div className="text-center py-8">
                                    <MessageSquare size={32} className="mx-auto text-gray-200 mb-3" />
                                    <p className="text-gray-500 text-sm">No notes have been added to this complaint yet.</p>
                                </div>
                            ) : (
                                selectedComplaint.notes.map((note, idx) => {
                                    const isSelf = note.addedBy === user?.Role || note.addedBy === 'user'; // Basic assumption for visual differentiation
                                    return (
                                        <div key={idx} className={`flex flex-col max-w-[85%] ${isSelf ? 'self-end items-end' : 'self-start items-start'}`}>
                                            <div className="flex items-center gap-2 mb-1 px-1">
                                                <span className="text-xs font-semibold capitalize text-gray-600">{note.addedBy}</span>
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(note.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className={`p-3 rounded-2xl text-sm ${isSelf ? 'bg-[#111827] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                                                {note.message}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Add Note Input Area */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                            <form onSubmit={handleNoteSubmit} className="flex gap-3 relative">
                                <input 
                                    type="text" 
                                    value={noteMessage}
                                    onChange={(e) => setNoteMessage(e.target.value)}
                                    placeholder="Type a note or reply..."
                                    className="flex-1 py-3 pl-4 pr-12 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all shadow-sm"
                                />
                                <button 
                                    type="submit" 
                                    disabled={submittingNote || !noteMessage.trim()}
                                    className="absolute right-2 top-2 bottom-2 bg-[#111827] text-white p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {submittingNote ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send size={16} />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
