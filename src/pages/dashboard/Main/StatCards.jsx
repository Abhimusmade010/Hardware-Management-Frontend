import {complaintStatistics} from "../../../api/auth.js"

import { useEffect ,useState} from "react";



const Stats = () => {

  
   const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await complaintStatistics();
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch complaint stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      
      <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-5">
        <p className="text-sm text-slate-400">Total Complaints</p>
        <h2 className="text-2xl font-bold text-white mt-2">
          {loading? "--":stats.total}
        </h2>
      </div>

      <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-5">
        <p className="text-sm text-yellow-400">Pending</p>
        <h2 className="text-2xl font-bold text-white mt-2">

           {loading? "--":stats.pending}
        </h2>
      </div>

      <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-5">
        <p className="text-sm text-green-400">Resolved</p>
        <h2 className="text-2xl font-bold text-white mt-2">
           {loading? "--":stats.resolved}
        </h2>
      </div>

      <div className="bg-[#020617] border border-[#1e293b] rounded-xl p-5">
        <p className="text-sm text-red-400">InProgress</p>
        <h2 className="text-2xl font-bold text-white mt-2">
           {loading? "--":stats.inProgress}
        </h2>
      </div>

    </div>
  );
};




export default Stats;
