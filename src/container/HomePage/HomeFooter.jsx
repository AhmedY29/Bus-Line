import React from "react";
import { Link } from "react-router";

function HomeFooter() {
  return (
    <footer className="bg-[#122031] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 py-8 px-4">
        {/* Left Side - Logo and About */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <img src="logoPng.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold">Bus Line</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Bus Line is a comprehensive transportation platform that connects
            students, parents, and drivers. We provide safe, reliable, and
            efficient school transportation services with real-time tracking and
            easy booking solutions.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col justify-center space-y-2 md:w-1/5 ">
          <li className="text-white transition-colors text-xl font-semibold">
            Get Started
          </li>
          <li>
            <Link
              to="/book"
              className="text-gray-200 hover:text-white transition-colors"
            >
              Book a Trip
            </Link>
          </li>
          <li>
            <Link
              to="/driver-register"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Join as a Driver
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>

      {/*  Team Names */}

      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-lg font-semibold mb-2">Our Team</h3>
        <div className="flex flex-wrap justify-center gap-5 text-center">
          <p className="text-gray-100 hover:text-white transition-colors">
            Ahmed Alsaleh
          </p>
          <p className="text-gray-100 hover:text-white transition-colors">
            Sulaiman Alfawzan
          </p>
          <p className="text-gray-100 hover:text-white transition-colors">
            Thekra Aljagthmi
          </p>
          <p className="text-gray-100 hover:text-white transition-colors">
            Sahar
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Bus Line. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
