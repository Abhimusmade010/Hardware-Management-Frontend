import { useState } from "react";
import { Link, Route } from "react-router-dom";
import NotificationBell from "../notifications/NotificationBell";
import { useAuth } from "../../context/AuthContext";
import ROUTES from "../../routes/routePaths";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../../pages/dashboard/Main/ProfilePopup";

const Navbar = () => {

  const [showPopup, setShowPopup] = useState(false);
  const {isAuthenticated,logout}=useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  const handleLogout=()=>{
    logout();
    setIsOpen(false);
    navigate(ROUTES.USER.LOGIN);

  }
  return (
    <nav className="w-full bg-[#1f2230] border-b border-[#2f344a]">
      
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to={ROUTES.USER.HOME} className="text-xl font-bold text-white">
          Hardware<span className="text-blue-500">Manager</span>
        </Link>

        {/* Desktop Links */}

        <div className="hidden md:flex items-center gap-6 text-gray-300">
          <Link to={ROUTES.USER.HOME}
          className="hover:text-white transition">
            Home
          </Link>

          {isAuthenticated &&(
            <>
              <Link to={ROUTES.USER.FORM} className="hover:text-white transition">
                Form
              </Link>
              <Link to={ROUTES.USER.DASHBOARD} className="hover:text-white transition">
                Dashboard
              </Link>

              <Link className="hover:text-white transition">
                <NotificationBell/>
              </Link>

              {/* <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>  */}


              {/* {/* //profile */}

              <div
                onClick={() => setShowPopup(prev => !prev)}
                className="w-8 h-8 rounded-full bg-blue-600 
                          cursor-pointer flex items-center justify-center"
              >
                A
              </div>
              {showPopup && (
                <ProfilePopup
                  onClose={() => setShowPopup(false)}
                  onLogout={handleLogout}
                />
              )}
            </>
              
          )}

          
          {!isAuthenticated && (
            <>
              <Link to={ROUTES.USER.LOGIN} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                Login
              </Link>

              <Link
                to={ROUTES.USER.SIGNUP}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                Sign Up
              </Link>
            </>
          )}

          

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      
      {/* Mobile Menu */}
      
      {isOpen && (
        <div className="md:hidden absolute right-6 top-16 w-48 bg-[#1f2230] border border-[#2f344a] rounded-lg shadow-lg py-3 z-50">
          
          <Link
            to={ROUTES.USER.HOME}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-300 hover:bg-[#2a2e3b] hover:text-white"
          >
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                  to={ROUTES.USER.DASHBOARD}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#2a2e3b] hover:text-white"
                >
                  Dashboard
                </Link>

                <Link
                  to={ROUTES.USER.HOME}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#2a2e3b] hover:text-white"
                >
                  Notifications
                </Link>

                <Link
                  to={ROUTES.USER.HOME}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#2a2e3b] hover:text-white"
                >
                  Form
                </Link>

                {/* <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>  */}
                <Link
                  // to="/"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-300 hover:bg-[#2a2e3b] hover:text-white"
                >

                  Logout
                </Link>

            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to={ROUTES.USER.LOGIN}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mx-2 mt-1 text-center"
              >
                Login
              </Link>

              <Link
                to={ROUTES.USER.SIGNUP}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mx-2 mt-1 text-center"
              >
                Sign Up
              </Link>
            </>
          )}
          
        </div>
      )}

    </nav>
  );
};

export default Navbar;
