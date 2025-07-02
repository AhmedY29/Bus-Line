import React, { useState } from "react";
import Stepper from "./Stepper";
import DriverForm from "./DriverForm";
import VehicleForm from "./VehicleForm";
import PaymentForm from "./PaymentForm";
import { Link } from "react-router-dom";
const steps = [
  { title: "Personal info", component: DriverForm },
  { title: "Vehicle Details", component: VehicleForm },
  { title: "Payment info", component: PaymentForm },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setShowConfirmation(true);
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="p-4 bg-gray-50 h-screen">
      <nav className="h-[10vh]  flex justify-start items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3 mr-2">
            <img
              src="./public/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-xl"
            />
            <h1 className="text-xl font-bold">BusLine</h1>
          </div>
        </Link>
      </nav>
      <Stepper currentStep={currentStep + 1} totalSteps={steps.length} />

      <div className="mt-6">
        <CurrentComponent />
      </div>

      <div className="flex justify-evenly mt-8">
        <button
          onClick={goToPrevStep}
          disabled={currentStep === 0}
          className="bg-transparent hover:bg-blue-500  text-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500  hover:border-transparent rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={
            currentStep === steps.length - 1 ? handleFinish : goToNextStep
          }
          disabled={currentStep === steps.length - 1 && showConfirmation}
          className="bg-blue-500  hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-50-50 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500  text-white rounded-full p-2 mr-2"></div>
              <h3 className="text-lg font-medium">Your Req under review</h3>
            </div>
            <p className="mb-4">
              You can access the library in the top right at any time.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-blue-500  hover:bg-blue-700  text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
