import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Navbar from "../../components/Layouts/Navbar";

const DashboardLayout = () => {
  return (
    
    <div className="flex bg-[#0f172a] min-h-screen">
      {/* Sidebar (fixed) */}
      
      <Sidebar />
      
      {/* Right side */}
      <div className="flex-1">
        {/* <Navbar/> */}
        {/* Topbar (fixed) */}
        <Topbar />

        {/* MAIN CONTENT CHANGES HERE */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
