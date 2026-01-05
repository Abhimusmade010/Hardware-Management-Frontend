const ComplaintsTable = () => {
  return (
    <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-4">
      <table className="w-full text-sm text-gray-300">
        <thead className="text-gray-400 border-b border-[#1e293b]">
          <tr>
            <th className="py-3 text-left">ID</th>
            <th>Status</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Add Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* <tr className="border-b border-[#1e293b] hover:bg-[#0f172a]">
            <td className="py-3">CMP-102</td>
            <td className="text-yellow-400">Pending</td>
            <td>Hardware</td>
            <td className="text-red-400">High</td>
            <td>
              <button className="text-blue-500 hover:underline">
                View
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
