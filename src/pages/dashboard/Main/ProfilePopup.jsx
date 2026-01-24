import { useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePopup = ({  onClose }) => {
  const popupRef = useRef(null);

  // const [isOpen, setIsOpen] = useState(false);
  const {logout}=useAuth();
  const navigate=useNavigate();
  const handleLogout=()=>{
    logout();
    onClose();
    // setIsOpen(false);
    navigate("/login", { replace: true });
    alert("Logout Successfully!!");

  }
  const handlOnClick=()=>{
    navigate("/profile") 

  }
  // close when clicking outside
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute right-4 top-14 w-48 rounded-xl
                 bg-[#020617] border border-[#1e293b]
                 shadow-xl z-50"
    >
      <div className="p-3 border-b border-[#1e293b]">
        {/* <p className="text-sm text-gray-400">Signed in as</p> */}
        <p className="font-medium text-white">Abhishek</p>
      </div>

      <button
        // onClick={}
        onClick={handlOnClick}
        className="w-full text-left px-4 py-2 text-gray-300
                   hover:bg-[#1e293b] hover:text-white transition"
      >
        Profile
      </button>

      <button
        className="w-full text-left px-4 py-2 text-gray-300
                   hover:bg-[#1e293b] hover:text-white transition"
      >
        Settings
      </button>

      <div className="border-t border-[#1e293b]" />

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-red-400
                   hover:bg-[#1e293b] transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePopup;
