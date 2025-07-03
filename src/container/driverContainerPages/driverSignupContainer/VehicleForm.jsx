import { useForm } from "@/context/driverForm";
import React, { useState } from "react";

const VehicleForm = () => {
  const { formData, updateField } = useForm();

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
            <h2 className="text-2xl font-bold mb-6 ">Add Your Vehicle</h2>
            {/* Vehicle Type */}
            <div>
              {/* <label className="block text-gray-700 font-medium mb-2">
            Vehicle Type 
            </label> */}
              <input
                type="text"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={(e) => updateField("vehicleName", e.target.value)}
                placeholder="Vehicle Type "
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Color
            </label> */}
                <input
                  type="text"
                  name="vehicleColor"
                  value={formData.vehicleColor}
                  onChange={(e) => updateField("vehicleColor", e.target.value)}
                  placeholder="Vehicle color"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Model
            </label> */}
                <input
                  type="text"
                  name="model"
                  value={formData.vehicleModel}
                  onChange={(e) => updateField("vehicleModel", e.target.value)}
                  placeholder="Vehicle model"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Plate Number + Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Plate Number
            </label> */}
                <input
                  type="text"
                  name="vehiclePlateNumber"
                  value={formData.vehiclePlateNumber}
                  onChange={(e) =>
                    updateField("vehiclePlateNumber", e.target.value)
                  }
                  placeholder="Plate number"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Capacity
            </label> */}
                <input
                  type="number"
                  name="vehicleCapacity"
                  value={formData.vehicleCapacity}
                  onChange={(e) =>
                    updateField("vehicleCapacity", e.target.value)
                  }
                  placeholder="Passenger capacity"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* License + Periodic Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Vehicle License
            </label> */}
                <input
                  type="text"
                  name="licenseImage"
                  value={formData.licenseImage}
                  onChange={(e) => updateField("licenseImage", e.target.value)}
                  placeholder="License Number or Upload"
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                {/* <label className="block text-gray-700 font-medium mb-2">
              Periodic Inspection
            </label> */}
                <select
                  name="periodicInspection"
                  title="Is Vehicle periodic inspection approved ?"
                  value={formData.vehicleYearlyCheck}
                  onChange={(e) =>
                    updateField("vehicleYearlyCheck", e.target.value)
                  }
                  className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
                >
                  <option value="">
                    Is Vehicle periodic inspection approved ?
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
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

export default VehicleForm;
