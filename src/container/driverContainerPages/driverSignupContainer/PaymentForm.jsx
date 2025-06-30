import React, { useState } from 'react';

const PaymentForm = () => {

  const [formData, setFormData] = useState({ creditCardType: '', });

 
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
        <h2 className="text-xl font-bold">Payment</h2>
    
      </div>

      
      <form onSubmit={handleSubmit}>
 
        <div className="mb-4">
          <label  className="block text-gray-700 font-medium mb-2">
            Credit Card
          </label>
          <input
            type="text"
            name="creditCardType"
            value={formData.creditCardType}
            onChange={handleChange}
            placeholder="Credit card ....."
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          />
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
            Finish
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default PaymentForm;