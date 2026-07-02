import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getComplaintDetails, addNoteToComplaint, updateComplaintStatus, submitReview, getReview } from '../../api/complaint';
import Navbar from '../../components/Layouts/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Monitor, AlignLeft, Clock, AlertTriangle, CheckCircle, User, Info, FileText, MessageSquare, Send, Image as ImageIcon, Eye } from 'react-feather';

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAuth();
    
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [noteMessage, setNoteMessage] = useState("");
    const [submittingNote, setSubmittingNote] = useState(false);

    const [newStatus, setNewStatus] = useState("");
    const [resolutionDetails, setResolutionDetails] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusError, setStatusError] = useState(false);

    const [reviewData, setReviewData] = useState(null);
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!token) return;
            try {
                const res = await getComplaintDetails(id, token);
                const fetchedComplaint = res.data?.data?.complaint || res.data?.complaint;
                setComplaint(fetchedComplaint);
                
                if (fetchedComplaint && (fetchedComplaint.status === 'resolved' || fetchedComplaint.status === 'closed')) {
                    const reviewRes = await getReview(id, token).catch(() => null);
                    if (reviewRes && reviewRes.data?.data?.review) {
                        setReviewData(reviewRes.data.data.review);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch complaint details", err);
                toast.error("Failed to load complaint details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, token, user?.Role]);

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

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        if (!noteMessage.trim()) return;

        setSubmittingNote(true);
        try {
            await addNoteToComplaint(id, { message: noteMessage }, token);
            toast.success("Note added successfully!");
            setNoteMessage("");
            
            const res = await getComplaintDetails(id, token);
            setComplaint(res.data?.data?.complaint || res.data?.complaint);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add note");
        } finally {
            setSubmittingNote(false);
        }
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        if (!newStatus) {
            setStatusError(true);
            return;
        }

        setUpdatingStatus(true);
        try {
            const data = { status: newStatus };
            if (newStatus === 'resolved' || newStatus === 'closed') {
                data.resolutionDetails = resolutionDetails;
            }
            await updateComplaintStatus(id, data, token);
            toast.success("Status updated successfully!");
            setNewStatus("");
            setResolutionDetails("");
            
            const res = await getComplaintDetails(id, token);
            setComplaint(res.data?.data?.complaint || res.data?.complaint);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        setSubmittingReview(true);
        try {
            const res = await submitReview(id, { ratings: rating, feedback }, token);
            toast.success("Review submitted successfully!");
            setReviewData(res.data?.data?.review);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-[#f9fafb]">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!complaint) {
        return (
            <div className="min-h-screen flex flex-col bg-[#f9fafb]">
                <Navbar />
                <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Not Found</h2>
                    <p className="text-gray-500 mb-6">The complaint you are looking for does not exist or you don't have access.</p>
                    <button onClick={() => navigate('/user/dashboard')} className="bg-[#111827] text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#f9fafb] font-sans text-gray-900">
            <Toaster position="top-center" />
            <Navbar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Area */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <button 
                            onClick={() => navigate('/user/dashboard')}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-3"
                        >
                            <ArrowLeft size={16} /> Back to Dashboard
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3 flex-wrap">
                            Ticket #{complaint.assetId}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusStyle(complaint.status)}`}>
                                {complaint.status}
                            </span>
                            {complaint.seenByManager && user?.Role !== 'maintainance' && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex items-center gap-1.5 border border-purple-200 shadow-sm">
                                    <Eye size={14} />
                                    Seen by Manager
                                </span>
                            )}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Logged on {new Date(complaint.createdAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Details Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <Info size={18} className="text-gray-400" />
                                <h3 className="text-base font-semibold text-gray-900">Issue Details</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Asset ID</p>
                                        <div className="flex items-center gap-2 font-medium text-gray-900">
                                            <Monitor size={16} className="text-gray-400" />
                                            {complaint.assetId}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Category</p>
                                        <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-md">
                                            {complaint.category}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Priority</p>
                                        <div className="flex items-center gap-2 font-medium">
                                            {complaint.priority === 'High' || complaint.priority === 'Critical' ? (
                                                <AlertTriangle size={16} className="text-red-500" />
                                            ) : (
                                                <CheckCircle size={16} className="text-blue-500" />
                                            )}
                                            <span className={complaint.priority === 'High' || complaint.priority === 'Critical' ? 'text-red-600' : 'text-gray-900'}>
                                                {complaint.priority}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <AlignLeft size={14} /> Description
                                    </p>
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {complaint.description}
                                    </p>
                                </div>

                                {(complaint.attachment || (complaint.attachments && complaint.attachments.length > 0)) && (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <ImageIcon size={14} /> Attached Media
                                        </p>
                                        <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 inline-block">
                                            {(() => {
                                                const attachment = complaint.attachment || (complaint.attachments && complaint.attachments[0]);
                                                if (!attachment) return null;

                                                let mediaUrl = '';
                                                let isVideo = false;

                                                if (typeof attachment === 'object' && attachment.url) {
                                                    mediaUrl = attachment.url;
                                                    isVideo = attachment.type === 'video' || mediaUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
                                                } else if (typeof attachment === 'string') {
                                                    mediaUrl = attachment;
                                                    isVideo = mediaUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);
                                                } else {
                                                    return null; // Invalid attachment format
                                                }

                                                return isVideo ? (
                                                    <video 
                                                        controls 
                                                        className="max-h-96 object-contain"
                                                    >
                                                        <source src={mediaUrl} />
                                                        Your browser does not support video.
                                                    </video>
                                                ) : (
                                                    <img 
                                                        src={mediaUrl} 
                                                        alt="Complaint Attachment" 
                                                        className="max-h-96 object-contain"
                                                    />
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        </div>

                        {/* Resolution Card (if resolved/closed) */}
                        {complaint.resolutionDetails && (
                            <div className="bg-green-50 rounded-2xl border border-green-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-green-100 bg-green-100/50 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600" />
                                    <h3 className="text-base font-semibold text-green-900">Resolution Details</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-green-800 text-sm leading-relaxed whitespace-pre-wrap">
                                        {complaint.resolutionDetails}
                                    </p>
                                    {complaint.resolutionDate && (
                                        <p className="text-xs text-green-600 mt-3 font-medium">
                                            Resolved on: {new Date(complaint.resolutionDate).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Review/Feedback Section (User Only, when resolved/closed) */}
                        {user?.Role === 'user' && (complaint.status === 'resolved' || complaint.status === 'closed') && (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                    <span className="text-xl leading-none">⭐</span>
                                    <h3 className="text-base font-semibold text-gray-900">Feedback & Review</h3>
                                </div>
                                <div className="p-6">
                                    {reviewData ? (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-lg font-bold text-gray-900">{reviewData.ratings} / 5</span>
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span key={star} className={star <= reviewData.ratings ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100">{reviewData.feedback}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (1-5)</label>
                                                <div className="flex items-center gap-1 text-2xl">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <button
                                                            type="button"
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                            className={`focus:outline-none transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-200'}`}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Feedback</label>
                                                <textarea
                                                    value={feedback}
                                                    onChange={(e) => setFeedback(e.target.value)}
                                                    placeholder="Share your experience..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none min-h-[80px]"
                                                    required
                                                />
                                            </div>
                                            <button 
                                                type="submit" 
                                                disabled={submittingReview}
                                                className="self-start bg-[#111827] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {submittingReview ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <span>Submit Feedback</span>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Status Update Card (Maintenance Only) */}
                        {user?.Role === 'maintainance' && complaint.status !== 'closed' && complaint.status !== 'resolved' && (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-yellow-600" />
                                    <h3 className="text-base font-semibold text-gray-900">Update Status</h3>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={handleStatusUpdate} className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Status</label>
                                            <select 
                                                value={newStatus}
                                                onChange={(e) => {
                                                    setNewStatus(e.target.value);
                                                    setStatusError(false);
                                                }}
                                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none appearance-none bg-white cursor-pointer ${statusError ? 'border-red-500' : 'border-gray-300'}`}
                                            >
                                                <option value="" disabled>Select Status</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                                <option value="escalated">Escalated</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            {statusError && (
                                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                                    <AlertTriangle size={12} /> Please select a status to update.
                                                </p>
                                            )}
                                        </div>
                                        
                                        {(newStatus === 'resolved' || newStatus === 'closed') && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Resolution Details</label>
                                                <textarea
                                                    value={resolutionDetails}
                                                    onChange={(e) => setResolutionDetails(e.target.value)}
                                                    placeholder="Provide details on how this issue was resolved..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none min-h-[100px]"
                                                    required
                                                />
                                            </div>
                                        )}

                                        <button 
                                            type="submit" 
                                            disabled={updatingStatus}
                                            className="self-start mt-2 bg-[#111827] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {updatingStatus ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <CheckCircle size={16} />
                                            )}
                                            {updatingStatus ? "Updating..." : "Update Status"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Tracking History */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <Clock size={18} className="text-gray-400" />
                                <h3 className="text-base font-semibold text-gray-900">Tracking History</h3>
                            </div>
                            <div className="p-6">
                                {(!complaint.statusHistory || complaint.statusHistory.length === 0) ? (
                                    <p className="text-sm text-gray-500 italic">No tracking history available yet.</p>
                                ) : (
                                    <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                                        {complaint.statusHistory.map((historyItem, idx) => (
                                            <div key={idx} className="relative pl-6">
                                                {/* Timeline Dot (Using inline style to guarantee exact negative positioning) */}
                                                <div className="absolute top-1 w-4 h-4 rounded-full bg-white border-2 border-[#111827]" style={{ left: '-9px' }}></div>
                                                
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-gray-900 capitalize">
                                                            {historyItem.newStatus}
                                                        </span>
                                                        <span className="text-[11px] font-medium text-gray-400">
                                                            {new Date(historyItem.changedAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    
                                                    {historyItem.remarks && (
                                                        <div className="mt-1.5 p-2.5 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">
                                                            <span className="font-semibold text-gray-700 block mb-0.5 capitalize">Update Note:</span>
                                                            {historyItem.remarks}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[500px]">
                            <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <MessageSquare size={18} className="text-gray-400" />
                                <h3 className="text-base font-semibold text-gray-900">Communication Notes</h3>
                            </div>
                            
                            <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-4">
                                {(!complaint.notes || complaint.notes.length === 0) ? (
                                    <div className="text-center py-6">
                                        <MessageSquare size={28} className="mx-auto text-gray-200 mb-2 opacity-50" />
                                        <p className="text-gray-500 text-sm">No notes have been added yet.</p>
                                    </div>
                                ) : (
                                    complaint.notes.map((note, idx) => {
                                        const isSelf = note.addedBy === user?.Role || note.addedBy === 'user';
                                        return (
                                            <div key={idx} className={`flex flex-col max-w-[90%] ${isSelf ? 'self-end items-end' : 'self-start items-start'}`}>
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
                </div>
            </main>
        </div>
    );
};

export default ComplaintDetails;
