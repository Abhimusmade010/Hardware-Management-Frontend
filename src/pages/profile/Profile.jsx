const Profile = () => {
  // later you can fetch this from context / API
  const user = {
    name: "Abhishek Musmade",
    email: "abhishek@gmail.com",
    cabin: "C-204",
    department: "IT Department",
  };

  return (

    <div className="min-h-screen bg-[#0f172a] p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-8">
        User <span className="text-blue-500">Profile</span>
      </h1>

      {/* Profile Card */}
      <div
        className="max-w-4xl mx-auto
        bg-gradient-to-br from-[#020617] to-[#020617]/90
        border border-[#1e293b]
        rounded-2xl shadow-xl p-8"
      >
        {/* Top Section */}
        <div className="flex items-center gap-6 mb-8">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-600
            flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>

          {/* Name + Email */}
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1e293b] mb-6" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cabin */}
          <div className="bg-[#020617] border border-[#1e293b]
            rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Cabin</p>
            <p className="text-lg font-medium text-white">
              {user.cabin}
            </p>
          </div>

          {/* Department */}
          <div className="bg-[#020617] border border-[#1e293b]
            rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Department</p>
            <p className="text-lg font-medium text-white">
              {user.department}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            className="px-6 py-2 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white font-medium transition"
          >
            Edit Profile
          </button>

          <button
            className="px-6 py-2 rounded-lg
            border border-[#1e293b]
            text-gray-300 hover:bg-[#1e293b]
            transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Profile;
