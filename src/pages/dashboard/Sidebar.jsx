const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#020617] border-r border-[#1e293b] min-h-screen p-5">
     

      <nav className="space-y-2">
        {[
          "Dashboard",
          "All Complaints",
          "Pending",
          "Resolved",
          "Analytics",
          "Settings",
        ].map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-2 rounded-lg
              text-gray-300 hover:bg-[#1e293b] hover:text-white
              transition"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
