import React, { useState } from 'react';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpireDate: '',
    address: '',
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

      <div className="flex justify-between mb-4">
      <h2 className="text-xl font-bold">Driver</h2>
      </div>
      

      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>


        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label  className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
        
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-2">
              No Handphone
            </label>
            <input
              type="tel"
        
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" no handphone"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* License Number and Expire Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              License Number
            </label>
            <input
              type="text"
           
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Total License Number"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              License Expire Date
            </label>
            <input
              type="date"
             
              name="licenseExpireDate"
              value={formData.licenseExpireDate}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <textarea
      
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder=" address"
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

 
        {/* <div className="flex justify-between">
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

export default DriverForm;