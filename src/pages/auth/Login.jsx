import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader, AlertCircle } from 'react-feather';
import { logUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routePaths';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    
    const navigate = useNavigate();
    
    // Fallback if useAuth is not yet fully implemented after cleanup
    const authContext = useAuth();
    const login = authContext?.login || (() => {});
    const isAuthenticated = authContext?.isAuthenticated || false;

    const [loginData, setLoginData] = useState({
        Email: "",
        Password: ""
    });
    const { Email, Password } = loginData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (!Email) {
            setError("Email is required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(Email)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (!Password) {
            setError("Password is required");
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
            const res = await logUser(loginData);
            const { token, user } = res.data?.data || {};
            
            if (token && user) {
                login(token, user);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', Email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
            }

            toast.success("Login Successful!");
            
            setTimeout(() => {
                const role = user?.Role || 'user';
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else if (role === 'maintainance') {
                    navigate(ROUTES?.MAINTENANCE?.DASHBOARD || '/maintenance/dashboard');
                } else if (role === 'staff') {
                    navigate('/staff/dashboard');
                } else {
                    navigate(ROUTES?.USER?.HOME || '/user/home');
                }
            }, 1000);
            
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setLoginData(prev => ({ ...prev, Email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 font-sans text-gray-800 relative">
            <Toaster position="top-right" />
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-8 transform transition-all hover:shadow-2xl z-10">
                
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">College Portal</h2>
                    <p className="text-sm text-gray-500 mt-2">Hardware Complaint Management System</p>
                </div>

                {/* Auth Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                    <Link to={ROUTES?.USER?.SIGNUP || '/user/signup'} className="flex-1 text-center py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-lg">
                        Signup
                    </Link>
                    <div className="flex-1 text-center py-2 text-sm font-semibold bg-white text-gray-900 shadow rounded-lg transition-all">
                        Login
                    </div>
                </div>

                <div className="mb-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">Welcome back</h3>
                    <p className="text-sm text-gray-500 mb-6">Login to access your dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-pulse">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                                placeholder="Enter your college email"
                                value={Email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border ${error && !Email ? 'border-red-300' : 'border-gray-200'} text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all`}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="Password"
                                placeholder="Enter your password"
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

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                            Remember me
                        </label>
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
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>
                </form>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} College Hardware Support. All rights reserved.
            </div>
        </div>
    );
};

export default Login;
