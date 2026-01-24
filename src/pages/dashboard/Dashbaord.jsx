

import StatCards from "../dashboard/Main/StatCards"
import ComplaintsTable from "./Main/ComplaintsTable";

const Dashboard = () => {
  
  return (
    <div className="flex bg-[#0f172a] min-h-screen">
      
      <div className="flex-1">
        <main className="p-6">
          <StatCards />
          <ComplaintsTable />
        </main>
        
      </div>
    </div>

  );
};

export default Dashboard; 
