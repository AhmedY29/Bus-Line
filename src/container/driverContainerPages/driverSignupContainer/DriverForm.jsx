import { useForm } from "../../../context/driverForm";
import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const DriverForm = () => {
  const { formData, updateField } = useForm();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
        {/* Left section */}
        <div className="md:w-1/2 p-8 hidden md:flex flex-col justify-center">
          <video className="w-35" src="/bus.webm" autoPlay loop muted></video>
          <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
          <p className="text-xl mb-6">
            Be part of our driving team and start earning today. <br /> Sign up
            now!
          </p>
          <p className="mb-4 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Login here!
            </a>
          </p>
        </div>

        {/* Right section */}
        <div className="md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Add Your Information</h2>

            {/* Username */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter Your Username"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Enter Your Email"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Enter Your Password"
                  className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {showPassword ? (
                    <HiEyeOff className="text-xl cursor-pointer" />
                  ) : (
                    <HiEye className="text-xl cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <HiEyeOff className="text-xl cursor-pointer" />
                  ) : (
                    <HiEye className="text-xl cursor-pointer" />
                  )}
                </button>
              </div>
            </div>
            {/* Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                  placeholder="Enter Your Phone Number"
                  className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                {/* License Image Upload */}
                <button
                  type="button"
                  className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 text-blue-500 focus:outline-none focus:border-blue-500 cursor-pointer hover:bg-blue-100 hover:shadow-md hover:shadow-blue-50 transition-all flex items-center justify-center"
                  onClick={() =>
                    document.getElementById("licenseImageInput").click()
                  }
                >
                  {formData.licenseImage ? (
                    <span className="text-green-600 font-medium">
                      ✓ License Image Uploaded
                    </span>
                  ) : (
                    <span>Upload License Image</span>
                  )}
                </button>
                <input
                  id="licenseImageInput"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        updateField("licenseImage", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {formData.licenseImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={formData.licenseImage}
                      alt="License preview"
                      className="h-16 w-16 object-cover rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => updateField("licenseImage", "")}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
