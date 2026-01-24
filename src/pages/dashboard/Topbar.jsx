// import ProfilePopup from "./Main/ProfilePopup";
// import { Link } from "react-router-dom";

// const Topbar = () => {
//   return (
//     <div className="h-16 bg-[#020617] border-b border-[#1e293b] 
//       flex items-center justify-between px-6">

//       <input
//         type="text"
//         placeholder="Search complaints..."
//         className="bg-[#0f172a] text-gray-200 px-4 py-2 rounded-lg
//           border border-[#1e293b] focus:outline-none focus:ring-2
//           focus:ring-blue-500 w-80"
//       />

//       <div className="flex items-center gap-4">
//         {/* <span className="text-gray-400">Welcome UserName</span> */}
        
//         <Link className="hover:text-white transition">
//             <ProfilePopup/>
//         </Link>
//         <div className="w-8 h-8 rounded-full bg-blue-600" />
//       </div>
      
//     </div>
//   );
// };

// export default Topbar;
import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import ProfilePopup from "./Main/ProfilePopup";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth (token, context, etc.)
    logout();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative h-16 bg-[#020617] border-b border-[#1e293b] 
      flex items-center justify-between px-6">

      <input
        type="text"
        placeholder="Search complaints..."
        className="bg-[#0f172a] text-gray-200 px-4 py-2 rounded-lg
          border border-[#1e293b] focus:outline-none focus:ring-2
          focus:ring-blue-500 w-80"
      />

      <div className="flex items-center gap-4">
        <span className="text-gray-400">Welcome User</span>

        {/* BLUE CIRCLE (TRIGGER) */}
        <div
          onClick={() => setShowPopup(prev => !prev)}
          className="w-8 h-8 rounded-full bg-blue-600 
                     cursor-pointer flex items-center justify-center"
        >
          A
        </div>

        {/* POPUP (CONDITIONAL) */}
        {showPopup && (
          <ProfilePopup
            onClose={() => setShowPopup(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;


