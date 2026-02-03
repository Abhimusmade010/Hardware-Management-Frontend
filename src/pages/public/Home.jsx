import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import ROUTES from "../../routes/routePaths";

const Home = () => {
  const { isAuthenticated } = useAuth();


  return (
    // <div>
    // <Navbar/>
    <div className="min-h-[calc(100vh-72px)] flex items-center bg-[#1f1f1f]">
      <div className="max-w-7xl bg-[#2a2e3b] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Simplify Hardware Issue
            <span className="text-blue-500"> Management</span>
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Report, track, and resolve hardware problems across your organization
            with a centralized and efficient system.
          </p>

          <div className="mt-6 flex gap-4">
            {!isAuthenticated && (
              <Link
              to={ROUTES.USER.LOGIN}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Get Started
              </Link>
            )}
            
          </div>

          {/* later add the route for get started after login  */}
          <div className="mt-6 flex gap-4">
            {isAuthenticated && (
              <Link
              to={ROUTES.USER.FORM}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Get Started
              </Link>
            )}
            
          </div>


        </div>

        {/* Illustration Placeholder */}

        <div className="hidden md:block">
          <div className="w-full h-80 bg-[#2a2e3b] rounded-xl flex items-center justify-center text-gray-400">
            <img  
            src="/dashboardpre.png"
            alt="Dashboard Preview"
            className="w-70 h-70 object-cover"
            ></img>
          </div>
        </div>

      </div>
    </div>
    // </div>
  );
};

export default Home;
