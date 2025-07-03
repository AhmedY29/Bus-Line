import React, { useState } from "react";
import Stepper from "./Stepper";
import DriverForm from "./DriverForm";
import VehicleForm from "./VehicleForm";
import PaymentForm from "./PaymentForm";
import { Link } from "react-router";
import { useForm } from "../../../context/driverForm";
import axios from "axios";
const steps = [
  { title: "Personal info", component: DriverForm },
  { title: "Vehicle Details", component: VehicleForm },
  { title: "Payment info", component: PaymentForm },
];

export default function MultiStepForm() {
  const { formData } = useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToNextStep = () => {
    if (currentStep == 0) {
      if (formData.name.trim() == "") {
        alert("Please Enter Your Username");
        return;
      }
      if (formData.email.trim() == "") {
        alert("Please Enter Your Email");
        return;
      }
      if (formData.password.trim() == "") {
        alert("Please Enter Your Password");
        return;
      }
      if (formData.phoneNumber.trim() == "") {
        alert("Please Enter Your Phone Number");
        return;
      }
    }
    //Vehicle Validation
    if (currentStep == 1) {
      if (formData.vehicleName.trim() == "") {
        alert("Please Enter Your Vehicle Type Ex: bus");
        return;
      }
      if (formData.vehicleColor.trim() == "") {
        alert("Please Enter Your Vehicle Color");
        return;
      }
      if (formData.vehicleModel.trim() == "") {
        alert("Please Enter Your Vehicle Model");
        return;
      }
      if (formData.vehicleCapacity.trim() == "") {
        alert("Please Enter Your Vehicle Capacity");
        return;
      }
      if (formData.vehiclePlateNumber.trim() == "") {
        alert("Please Enter Your Vehicle Plate Number Ex: BJB 8989");
        return;
      }
      if (formData.vehicleYearlyCheck.trim() == "") {
        alert("Please Enter Your Vehicle Periodic Inspection ");
        return;
      }
    }
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
    try {
      setIsLoading(true);
      axios
        .post(
          "https://bus-line-backend.onrender.com/api/auth/signup-driver",
          formData
        )
        .then(() => alert("Created Driver Successfully"));
    } catch (error) {
      console.log("Error In Create Driver:", error.message);
    } finally {
      setIsLoading(false);
      setShowConfirmation(true);
    }
    console.log(formData, "form");
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
          {isLoading
            ? "Loading..."
            : currentStep === steps.length - 1
            ? "Finish"
            : "Next"}
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
