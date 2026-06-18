import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import ROUTES from '../../routes/routePaths';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    // Fallback if useAuth is not yet fully implemented
    const authContext = useAuth();
    const login = authContext?.login || (() => {});

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
            const { token, user } = res.data?.data || {};
            
            if (token && user) {
                login(token, user);
            }
            
            toast.success("Account created successfully!");
            
            setTimeout(() => {
                const role = user?.Role || 'user';
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate(ROUTES?.USER?.HOME || '/user/home');
                }
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-4 font-sans text-gray-900">
            <Toaster position="top-center" />
            
            {/* Logo area */}
            <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-[#111827] rounded-md flex items-center justify-center text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                        <polyline points="16 6 12 2 8 6"></polyline>
                        <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                </div>
                <h1 className="text-xl font-medium text-gray-900">College Portal.</h1>
            </div>

            <div className="w-full max-w-[420px] bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-8">
                
                <div className="mb-6">
                    <h2 className="text-[22px] font-semibold text-center text-gray-900 mb-1.5">Create an account</h2>
                    <p className="text-[15px] text-gray-500 text-center">Join using your Email or Google account</p>
                </div>

                <button type="button" className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors mb-6 text-[15px] font-medium text-gray-700">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign up with Google
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">Or continue with</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[14px] rounded-md text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            name="Name"
                            placeholder="John Doe"
                            value={Name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 bg-[#edf2f7] border ${error && !Name ? 'border-red-300' : 'border-transparent'} text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors`}
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="billjet@hotmail.com"
                            value={Email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 bg-[#edf2f7] border ${error && !Email ? 'border-red-300' : 'border-transparent'} text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors`}
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-medium text-gray-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            name="Password"
                            placeholder="••••••••••••"
                            value={Password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 bg-[#edf2f7] border ${error && !Password ? 'border-red-300' : 'border-transparent'} text-gray-900 text-[15px] rounded-md focus:outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-colors`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-[#707070] hover:bg-[#5a5a5a] text-white font-medium text-[15px] py-2.5 rounded-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Creating account...</span>
                            </>
                        ) : (
                            <span>Sign up</span>
                        )}
                    </button>
                </form>

                <p className="text-[14px] text-gray-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to={ROUTES.USER?.LOGIN || '/user/login'}
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
            
            <div className="mt-8 text-center text-[13px] text-gray-500 max-w-sm">
                By clicking continue, you agree to our <br/>
                <a href="#" className="underline hover:text-gray-700">Terms of Service</a> and <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
            </div>
        </div>
    );
};

export default Signup;
