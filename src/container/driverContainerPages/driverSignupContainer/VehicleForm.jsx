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
  });


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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Vehicle</h2>
        
      </div>

     
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            placeholder="Vehicle name "
            className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
          />
        </div>

   
        <div className="grid grid-cols-2 gap-4 mb-4">
    
          <div>
            <labelxw className="block text-gray-700 font-medium mb-2">
              Color
            </labelxw>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder=" color"
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              />
          </div>

          {/* Model */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Model
            </label>
            <input
              type="text"
    
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder=" model"
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              />
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 mb-4">
       
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Plate Number
            </label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              placeholder="plate Number"
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Number"
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              />
          </div>
        </div>

   
        <div className="grid grid-cols-2 gap-4 mb-4">
       
          <div>
            <label  className="block text-gray-700 font-medium mb-2">
              Vehicle License
            </label>
            <input
              type="text"
        
              name="vehicleLicense"
              value={formData.vehicleLicense}
              onChange={handleChange}
              placeholder="Maybe add file"
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              />
          </div>

          {/* Periodic Inspection */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
            Periodic Inspection
            </label>
            <select
       
              name="periodicInspection"
              value={formData.periodicInspection}
              onChange={handleChange}
              className=" rounded w-full border border-gray-300 px-4 py-2  bg-blue-50 p-4 h-12 placeholder:text-blue-500   focus:shadow-md focus:shadow-blue-50  text-blue-500  focus:outline-none focus:border-blue-500 "
              >
              <option value="">Select...</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

  
        {/* <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => alert('Go back')}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default VehicleForm;