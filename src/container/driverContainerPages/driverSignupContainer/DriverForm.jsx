import React, { useState } from 'react';
import { HiEye, HiEyeOff } from "react-icons/hi";

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpireDate: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
    {/* Container */}
    <div className="w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
  
    <div className="md:w-1/2 p-8  hidden md:flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
              <p className="text-xl mb-6">
                Be part of our driving team and start earning today. <br /> Sign up now!
              </p>
              <p className="mb-4 text-sm">
                Already have an account?{' '}
                <a href="/login" className=" text-blue-500 hover:text-blue-700 transition-colors">
                  Login here!
                </a>
              </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-8">
          <p className='text-2xl font-bold mb-4'>Sign up</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Username */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Create User Name"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Phone Number */}
            {/* <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
            </div> */}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder=" Password"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
              </button>
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 transition-colors"
            >
              Register
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;