

const ComplaintModal = ({ complaint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-[#020617] w-full max-w-lg rounded-xl p-6 border border-slate-700 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Complaint Details
        </h2>

        <div className="space-y-3 text-gray-300">
          <p><span className="text-gray-400">ID:</span> {complaint.id}</p>
          <p><span className="text-gray-400">Status:</span> {complaint.status}</p>
          <p><span className="text-gray-400">Category:</span> {complaint.category}</p>
          <p><span className="text-gray-400">Priority:</span> {complaint.priority}</p>
          <p><span className="text-gray-400">Asset ID:</span> {complaint.assetId}</p>
          <p>
            <span className="text-gray-400">Description:</span><br />
            {complaint.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;
