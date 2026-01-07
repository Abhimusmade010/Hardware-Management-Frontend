//here are complaints are listed from the database

const ComplaintsTable = () => {
  return (
    <div className="bg-[#020617] border border-[#1e293b] rounded-xl overflow-hidden">
      <table className="w-full text-sm text-gray-300">
        {/* TABLE HEADER */}
        <thead className="bg-[#020617] text-gray-400 border-b border-[#1e293b]">
          <tr>
            <th className="px-4 py-3 text-left font-medium">ID</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            {/* <th className="px-4 py-3 text-left font-medium">Priority</th> */}
            <th className="px-4 py-3 text-left font-medium">Add Note</th>
            <th className="px-4 py-3 text-left font-medium">Action</th>
            <th className="px-4 py-3 text-left font-medium">Details</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          <tr className="border-b border-[#1e293b] hover:bg-[#0f172a] transition">
            <td className="px-4 py-3 font-medium">CMP-102</td>

            <td className="px-4 py-3">
              <span className="text-yellow-400">Pending</span>
            </td>

            <td className="px-4 py-3">Hardware</td>

            {/* <td className="px-4 py-3">
              <span className="text-red-400">High</span>
            </td> */}

            <td className="px-4 py-3">
              <button className="text-blue-500 hover:underline">
                View
              </button>
            </td>

            <td className="px-4 py-3">
              <button className="text-amber-500 hover:underline">
                Details
              </button>
            </td>
            <td className="px-4 py-3">
              <button className="text-amber-500 hover:underline">
                View
              </button>
            </td>
          </tr>
        </tbody>


        
      </table>
    </div>
  );
};

export default ComplaintsTable;
