import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition
     ${isActive
       ? "bg-[#1e293b] text-white"
       : "text-gray-300 hover:bg-[#1e293b] hover:text-white"}`;

  return (

    <aside className="w-64 bg-[#020617] border-r border-[#1e293b] min-h-screen p-5">
      


      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          Dashboard
        </NavLink>
        {/* <NavLink to="/dashboard/complaint" end className={linkClass}>
          All Complaints
        </NavLink> */}
        <NavLink to="/dashboard/pending" end className={linkClass}>
          Pending
        </NavLink>
        <NavLink to="/dashboard/resolved" end className={linkClass}>
          Resolved
        </NavLink>

        <NavLink to="/dashboard/analytics" end className={linkClass}>
          Analytics(Optional)
        </NavLink>

        <NavLink to="/dashboard/settings" end className={linkClass}>
          Settings
        </NavLink>


      </nav>
    </aside>
  );
};

export default Sidebar;




