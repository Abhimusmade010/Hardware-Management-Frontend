import React from 'react';
import Navbar from '../../components/Layouts/Navbar';
import { Link } from 'react-router-dom';
import { Shield, Clock, Tool, ArrowRight } from 'react-feather';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-[#f9fafb] border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 lg:mb-6 leading-tight">
                                Streamlining College Hardware Maintenance
                            </h1>
                            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto md:mx-0">
                                The centralized portal for reporting and tracking hardware and software issues across the campus. Experience faster resolution times and complete transparency.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                                <Link 
                                    to="/user/raise" 
                                    className="w-full sm:w-auto bg-[#111827] text-white font-medium px-8 py-3.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                                >
                                    Raise a Complaint
                                    <ArrowRight size={18} />
                                </Link>
                                <Link 
                                    to="/user/dashboard" 
                                    className="w-full sm:w-auto bg-white text-gray-900 border border-gray-300 font-medium px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    View Dashboard
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm md:max-w-md mt-6 md:mt-0">
                            <div className="relative w-full aspect-square max-w-[380px]">
                                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 sm:gap-5 transform rotate-3">
                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-3 sm:pb-4">
                                        <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center shrink-0">
                                            <Tool size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Projector Malfunction</p>
                                            <p className="text-sm text-gray-500">Room 304 • Hardware</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-3 sm:pb-4 opacity-70">
                                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Lab PC Software Issue</p>
                                            <p className="text-sm text-gray-500">Lab 2 • Software</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-40">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Network Printer</p>
                                            <p className="text-sm text-gray-500">Library • Hardware</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Our transparent workflow ensures your complaints are handled efficiently and you are kept in the loop.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                    <span className="text-xl font-bold text-gray-900">1</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Report</h3>
                                <p className="text-gray-500">Easily file a new complaint through the portal by selecting the asset and providing details of the issue.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                    <span className="text-xl font-bold text-gray-900">2</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track</h3>
                                <p className="text-gray-500">Monitor the progress on your Dashboard as our maintenance team reviews, assigns, and resolves the issue.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                                    <span className="text-xl font-bold text-gray-900">3</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Resolve</h3>
                                <p className="text-gray-500">Get notified immediately when the issue is resolved, minimizing downtime for your department.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        College Portal.
                    </div>
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} College Hardware Support System. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <Link to="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-gray-900 transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
