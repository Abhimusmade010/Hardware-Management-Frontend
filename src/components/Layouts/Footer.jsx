
import React from "react";
const Footer = () => {
  return (
    <footer className="w-full bg-[#1f2430] border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="text-gray-400 text-sm">
          <span className="text-white font-semibold">Hardware</span>
          <span className="text-blue-500 font-semibold">Manager</span>
          <p className="text-xs mt-1">
            Simplifying hardware issue management
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-400">
          {/* <a href="/" className="hover:text-white transition">Home</a>
          <a href="/form" className="hover:text-white transition">Form</a>
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a> */}
          <h1>Contact</h1>
          <p></p>
          <a href="https://www.flaticon.com/free-icons/phone-number" title="phone number icons">Phone Number</a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()} HardwareManager. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
