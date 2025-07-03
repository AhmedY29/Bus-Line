import { useForm } from "../../../context/driverForm";
import React, { useState } from "react";

const DriverForm = () => {
  const { formData, updateField } = useForm();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      {/* Container */}
      <div className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8  hidden md:flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
          <p className="text-xl mb-6">
            Be part of our driving team and start earning today. <br /> Sign up
            now!
          </p>
          <p className="mb-4 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className=" text-blue-500 hover:text-blue-700 transition-colors"
            >
              Login here!
            </a>
          </p>
        </div>

        <div className="md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 ">Add Your Information</h2>
            {/* Vehicle Type */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
            Vehicle Type 
            </label> */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  // onChange={handleChange}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter Your Username "
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Color
            </label> */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  // onChange={handleChange}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Model
            </label> */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  // onChange={handleChange}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Enter Your Password"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Model
            </label> */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Your Confirm Password"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Plate Number + Capacity */}
            <div>
              {/* <label className="block text-gray-700 font-medium mb-2">
              Plate Number
            </label> */}
              <input
                type="text"
                name="plateNumber"
                value={formData.phoneNumber}
                // onChange={handleChange}
                onChange={(e) => updateField("phoneNumber", e.target.value)}
                placeholder="Enter Your Phone Number"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            {/* <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors"
          >
            Next
          </button>
        </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
