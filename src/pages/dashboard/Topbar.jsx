const Topbar = () => {
  return (
    <div className="h-16 bg-[#020617] border-b border-[#1e293b] 
      flex items-center justify-between px-6">

      <input
        type="text"
        placeholder="Search complaints..."
        className="bg-[#0f172a] text-gray-200 px-4 py-2 rounded-lg
          border border-[#1e293b] focus:outline-none focus:ring-2
          focus:ring-blue-500 w-80"
      />

      <div className="flex items-center gap-4">
        <span className="text-gray-400">Welcome UserName</span>
        <div className="w-8 h-8 rounded-full bg-blue-600" />
      </div>
      
    </div>
  );
};

export default Topbar;

