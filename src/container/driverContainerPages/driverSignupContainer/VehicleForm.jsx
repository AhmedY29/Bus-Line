import { useForm } from "../../../context/driverForm";
import React, { useState } from "react";

const VehicleForm = () => {
  const { formData, updateField } = useForm();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value); // Update the field directly
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      updateField(name, URL.createObjectURL(files[0])); // Update the image field directly
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      {/* Container */}
      <div className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 hidden md:flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
          <p className="text-xl mb-6">
            Be part of our driving team and start earning today. <br /> Sign up now!
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

        <div className="md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Add Your Vehicle</h2>

            {/* Vehicle Type */}
            <div>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="Vehicle Type"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Vehicle Color and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Vehicle Color"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Vehicle Model"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Plate Number and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Passenger Capacity"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* License and Periodic Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="vehicleLicense"
                value={formData.vehicleLicense}
                onChange={handleChange}
                placeholder="License Number"
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              />
              <select
                name="periodicInspection"
                value={formData.periodicInspection}
                onChange={handleChange}
                className="w-full border-gray-300 px-4 py-2 bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500 focus:shadow-md focus:shadow-blue-50 text-blue-500 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Periodic Inspection</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Upload License and Registration Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload License Image</label>
                <input
                  type="file"
                  name="licenseImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 focus:shadow-md focus:outline-none"
                />
                {formData.licenseImage && (
                  <img
                    src={formData.licenseImage}
                    alt="License"
                    className="mt-2 h-32 object-cover rounded border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Vehicle Registration</label>
                <input
                  type="file"
                  name="registrationImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 focus:shadow-md focus:outline-none"
                />
                {formData.registrationImage && (
                  <img
                    src={formData.registrationImage}
                    alt="Registration"
                    className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 focus:shadow-md focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
              >
                Submit Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;

