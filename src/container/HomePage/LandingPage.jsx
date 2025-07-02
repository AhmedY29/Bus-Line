import React, { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import { scrollToHomeBook } from "../../utils/scrollUtils";
function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-fit md:h-screen bg-[#F5F7FA] py-5 px-7">
      <nav className="flex justify-between items-center py-3 px-10 bg-white shadow-md shadow-black/5 rounded-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img src="./public/logo.png" alt="Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">BusLine</h1>
          </div>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 pr-5">
          <Link to="/" className="text-blue-700 text-lg">
            Home
          </Link>
          <Link
            to="/login"
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-neutral-700 text-lg hover:text-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-blue-700 transition-colors p-2"
          >
            {isMobileMenuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-8/12 shadow-md rounded-lg mt-2 mx-7 overflow-hidden">
          <div className="flex flex-col">
            <Link
              to="/"
              className="text-blue-700 text-lg px-6 py-3 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3 border-b border-gray-100"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-neutral-700 text-lg hover:text-blue-700 hover:bg-gray-50 transition-colors px-6 py-3"
              onClick={toggleMobileMenu}
            >
              Register
            </Link>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row  items-center justify-center h-full md:h-10/12 gap-5 ">
        <div className=" flex flex-col justify-center rounded-lg p-3 gap-10 h-full w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#152C5B]">
            Public transport made <br /> easy!
          </h2>
          <p className="text-gray-700 text-base md:text-lg lg:text-xl">
            We make getting to school simple, safe, and always on time — every
            day. You can view the subscription plans below and see what works
            best for you.
          </p>
          <div className="flex w-full gap-5 justify-start items-center">
            <button
              onClick={scrollToHomeBook}
              className="bg-[#0165AD] text-white px-5 md:px-7 lg:px-10 py-1.5 rounded-lg shadow-md shadow-blue-700/20 hover:bg-[#0165add2] transition-colors text-base cursor-pointer"
            >
              Book a Trip
            </button>
            <button
              className="bg-[#0165AD] text-white px-5 md:px-7 lg:px-10 py-1.5 rounded-lg shadow-md shadow-blue-700/20 hover:bg-[#0165add2] transition-colors text-base cursor-pointer"
              onClick={() => navigate("/driver-register")}
            >
              Join as a Driver
            </button>
          </div>
        </div>
        <div className=" flex flex-col justify-center rounded-lg p-5 gap-10 h-full w-full md:w-1/2">
          <img
            src="/logoPng.png"
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
