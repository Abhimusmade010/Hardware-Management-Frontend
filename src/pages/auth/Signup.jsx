import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Loader, AlertCircle } from 'react-feather';
import { signUpUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routePaths';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [signupData, setSignupData] = useState({
        Name: "",
        Email: "",
        Password: ""
    });
    
    const { Name, Email, Password } = signupData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (!Name || !Email || !Password) {
            setError("All fields are required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(Email)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (Password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setError("");
        setLoading(true);
        
        try {
            const res = await signUpUser(signupData);
            const { token, user } = res.data.data;
            
            // Store JWT in localStorage via useAuth
            login(token, user);
            
            toast.success("Account created successfully!");
            
            // Redirect based on role (Default user -> Home/Dashboard)
            setTimeout(() => {
                navigate(ROUTES.USER?.HOME || '/user/home');
            }, 1000);
            
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Signup failed. Please try again.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12 font-sans text-gray-800 relative">
            <Toaster position="top-right" />
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-8 transform transition-all hover:shadow-2xl z-10">
                
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h2>
                    <p className="text-sm text-gray-500 mt-2">Join the College Portal</p>
                </div>

                {/* Auth Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                    <div className="flex-1 text-center py-2 text-sm font-semibold bg-white text-gray-900 shadow rounded-lg transition-all">
                        Signup
                    </div>
                    <Link to={ROUTES.USER?.LOGIN || '/user/login'} className="flex-1 text-center py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-lg">
                        Login
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-pulse">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <UserIcon size={18} />
                            </div>
                            <input
                                type="text"
                                name="Name"
                                placeholder="John Doe"
                                value={Name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${error && !Name ? 'border-red-300' : 'border-gray-200'} text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                name="Email"
                                placeholder="john@college.edu"
                                value={Email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${error && !Email ? 'border-red-300' : 'border-gray-200'} text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="Password"
                                placeholder="Create a password (min. 6 characters)"
                                value={Password}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border ${error && !Password ? 'border-red-300' : 'border-gray-200'} text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                <span>Creating account...</span>
                            </>
                        ) : (
                            <span>Sign up</span>
                        )}
                    </button>
                </form>

                {/* Login Link */}
                {!isAuthenticated && (
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to={ROUTES.USER?.LOGIN || '/user/login'}
                                className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-6 text-center text-sm text-gray-500 w-full left-0">
                &copy; {new Date().getFullYear()} College Hardware Support. All rights reserved.
            </div>
        </div>
    );
};

export default Signup;
