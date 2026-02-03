import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-8">

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-wide">
            Complaint Management System
          </h1>
          <p className="text-slate-400 text-lg">
            Report issues easily and track resolution in real time.
            Maintenance engineers can manage, assign and resolve complaints efficiently.
          </p>
        </div>

        {/* Role Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {/* User Button */}
          <div
            onClick={() => navigate("/user/home")}
            className="cursor-pointer bg-[#020617] border border-slate-700 
                       hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20
                       rounded-xl p-8 transition-all duration-300 group"
          >
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400">
              Continue as User
            </h2>
            <p className="text-slate-400">
              Raise a complaint, track status, and get updates without any login.
            </p>
          </div>

          {/* Maintenance Button */}
          <div
            onClick={() => navigate("/maintenance/login")}
            className="cursor-pointer bg-[#020617] border border-slate-700 
                       hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20
                       rounded-xl p-8 transition-all duration-300 group"
            >
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400">
              Maintenance Engineer
            </h2>
            <p className="text-slate-400">
              Manage complaints, assign technicians, and update resolution status.
            </p>
          </div>

        </div>

        {/* Footer text */}
        <p className="text-xs text-slate-500 mt-12">
          © {new Date().getFullYear()} Internal Maintenance Portal
        </p>

      </div>
    </div>
  );
};

export default LandingPage;
