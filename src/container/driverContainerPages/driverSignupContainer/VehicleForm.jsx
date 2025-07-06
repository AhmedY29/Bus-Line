import React, { useState } from 'react';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    color: '',
    model: '',
    plateNumber: '',
    vehicleLicense: '',
    capacity: '',
    periodicInspection: '',
    licenseImage: null,
    registrationImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">
        {/* Left section */}
        <div className="md:w-1/2 p-8 hidden md:flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
          <p className="text-xl mb-6">
            Be part of our driving team and start earning today.
            <br /> Sign up now!
          </p>
          <p className="mb-4 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here!
            </a>
          </p>
        </div>

        {/* Form section */}
        <div className="md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Add Your Vehicle</h2>

            {/* Vehicle Type */}
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              placeholder="Vehicle Type"
              className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
            />

            {/* Color & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Vehicle Color"
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
              />
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Vehicle Model"
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
              />
            </div>

            {/* Plate & Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="Plate Number"
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
              />
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Passenger Capacity"
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
              />
            </div>

            {/* License & Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="vehicleLicense"
                value={formData.vehicleLicense}
                onChange={handleChange}
                placeholder="License Number"
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 placeholder:text-blue-500 focus:shadow-md focus:outline-none"
              />
              <select
                name="periodicInspection"
                value={formData.periodicInspection}
                onChange={handleChange}
                className="w-full border-gray-300 bg-blue-50 p-4 rounded h-12 text-blue-500 focus:shadow-md focus:outline-none"
              >
                <option value="">Periodic Inspection</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* License Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload License Image</label>
              <input
                type="file"
                name="licenseImage"
                accept="image/*"
                onChange={handleImageChange}
                placeholder='License Image'
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

            {/* Registration Image */}
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

            {/* Submit */}
            {/* <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
              >
                Submit Vehicle
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;
