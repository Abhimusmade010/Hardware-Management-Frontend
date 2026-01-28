import { useEffect, useState } from "react";
import { allComplaints } from "../../../api/auth";
import { useNavigate } from "react-router-dom";


const ComplaintsTable = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // ✅ array
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchComplaints = async () => {
      try {
        const res = await allComplaints();
        console.log("API response:",res.data);
        setData(res.data);                // ✅ array of complaints
      } catch (err) {
        console.error(err);
        setError("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };  

    fetchComplaints();              // ✅ MUST CALL
  }, []);                           // ✅ dependency array

  // if (loading) {
  //   return (
  //     <div className="text-center py-6 text-gray-400">
  //       Loading complaints...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-center py-6 text-red-400">
  //       {error}
  //     </div>
  //   );
  // }

  return (
    <div className="bg-[#020617] border border-[#1e293b] rounded-xl overflow-hidden">
      <table className="w-full text-sm text-gray-300">
        {/* TABLE HEADER */}
        <thead className="bg-[#020617] text-gray-400 border-b border-[#1e293b]">
          <tr>
            <th className="px-4 py-3 text-left font-medium">ID</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">Priority</th>
            <th className="px-4 py-3 text-left font-medium">AssetID</th>
            <th className="px-4 py-3 text-left font-medium">Details</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No complaints found
              </td>
            </tr>
          )}

          {data.map((c, index) => (
            <tr
              key={c._id}
              className="border-b border-[#1e293b] hover:bg-[#0f172a] transition"
            >
              <td className="px-4 py-3 font-medium">
                {index + 1}
              </td>

              <td className="px-4 py-3">
                <span
                  className={
                    c.status === "Pending"
                      ? "text-yellow-400"
                      : c.status === "Resolved"
                      ? "text-green-400"
                      : "text-blue-400"
                  }
                >
                  {c.status}
                </span>
              </td>

              <td className="px-4 py-3">{c.category}</td>

              <td className="px-4 py-3">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => alert(`Priority: ${c.priority}`)}
                >
                  View
                </button>
              </td>

              <td className="px-4 py-3">
                <button
                  className="text-amber-500 hover:underline"
                  onClick={() => alert(`Asset ID: ${c.assetId}`)}
                >
                  Details
                </button>
              </td>

              <td className="px-4 py-3">
                <button
                  className="text-amber-500 hover:underline"
                  onClick={() => alert(`Description: ${c.description}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;
