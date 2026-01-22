
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import StatCards from "../dashboard/Main/StatCards"
import ComplaintsTable from "./Main/ComplaintsTable";



const Dashboard = () => {
  return (
    <div className="flex bg-[#0f172a] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6">
          <StatCards />
          <ComplaintsTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
