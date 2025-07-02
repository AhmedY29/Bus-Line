import React, { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    creditCardType: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: ''
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
    <div className="flex items-center justify-center bg-gray-50">

      <div className="w-full max-w-6xl overflow-hidden flex flex-col md:flex-row">

      <div className="md:w-1/2 p-8  hidden md:flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Join as Driver</h1>
          <p className="text-xl mb-6">
            Be part of our driving team and start earning today. <br /> Sign up now!
          </p>
          <p className="mb-4 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700 transition-colors">
              Login here!
            </a>
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Credit Card Type */}
            <div>
              {/* <label htmlFor="creditCardType" className="block text-gray-700 font-medium mb-2">
                Credit Card Type
              </label> */}
              <input
                type="text"
                id="creditCardType"
                name="creditCardType"
                value={formData.creditCardType}
                onChange={handleChange}
                placeholder="Enter Credit Card Type"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Credit Card Number */}
            <div>
              {/* <label htmlFor="creditCardNumber" className="block text-gray-700 font-medium mb-2">
                Credit Card Number
              </label> */}
              <input
                type="text"
                id="creditCardNumber"
                name="creditCardNumber"
                value={formData.creditCardNumber}
                onChange={handleChange}
                placeholder="Credit Card Number"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Expiration Date */}
            <div>
              {/* <label htmlFor="expirationDate" className="block text-gray-700 font-medium mb-2">
                Expiration Date
              </label> */}
              <input
                type="text"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* CVV */}
            <div>
              {/* <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                CVV
              </label> */}
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full  border-gray-300 px-4 py-2  bg-blue-50 p-4 rounded h-12 placeholder:text-blue-500  focus:shadow-md focus:shadow-blue-50  text-blue-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            {/* <div className="mt-6 flex justify-between">
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
      </div>
    </div>
  );
};

export default PaymentForm;