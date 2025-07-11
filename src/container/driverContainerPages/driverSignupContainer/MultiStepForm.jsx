import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Stepper from "./Stepper";
import DriverForm from "./DriverForm";
import VehicleForm from "./VehicleForm";
import PaymentForm from "./PaymentForm";
import { useForm } from "../../../context/driverForm";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const steps = [
  { title: "Personal info", component: DriverForm },
  { title: "Vehicle Details", component: VehicleForm },
  { title: "Payment info", component: PaymentForm },
];

export default function MultiStepForm() {
  const { formData } = useForm();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToNextStep = () => {
    // Validation based on current step
    if (currentStep === 0) {
      if (!formData.name.trim()) {
        toast.error("Please Enter Your Username");
        return;
      }
      if (!formData.email.trim()) {
        toast.error("Please Enter Your Email");
        return;
      }
      const emailRgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const correctEmail = emailRgex.test(formData.email);
      if (!correctEmail) {
        toast.error("Please Enter Valid Email EX: example@example.com");
        return;
      }
      if (!formData.password.trim()) {
        toast.error("Please Enter Your Password");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
      if (!formData.phoneNumber.trim()) {
        toast.error("Please Enter Your Phone Number");
        return;
      }

      if (formData.phoneNumber[0] !== "5") {
        toast.error("Please Enter Valid Phone Number Ex: 5xx xxx xxx");
        return;
      }
      const phoneNumber = formData.phoneNumber.trim();
      if (phoneNumber.length !== 9) {
        toast.error("Phone number must be 9 digits long ex: 5xx xxx xxx");
        return;
      }
    }

    if (currentStep === 1) {
      if (!formData.vehicleName.trim()) {
        toast.error("Please Enter Your Vehicle Type Ex: bus");
        return;
      }
      if (!formData.vehicleColor.trim()) {
        toast.error("Please Enter Your Vehicle Color");
        return;
      }
      if (!formData.vehicleModel.trim()) {
        toast.error("Please Enter Your Vehicle Model");
        return;
      }
      if (!formData.vehiclePlateNumber.trim()) {
        toast.error("Please Enter Your Vehicle Plate Number Ex: BJB 8989");
        return;
      }
      if (!formData.vehicleCapacity.trim()) {
        toast.error("Please Enter Your Vehicle Capacity");
        return;
      }
      if (formData.vehicleCapacity < 1) {
        toast.error("Vehicle capacity must be at least 1");
        return;
      }
      if (!formData.licenseImage) {
        toast.error("Please Upload Your Vehicle License Image");
        return;
      }
      if (!formData.vehicleYearlyCheck.trim()) {
        toast.error("Please Enter Your Vehicle Periodic Inspection");
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

  const handleFinish = async () => {
    if (currentStep === 2) {
      if (!formData.bankName.trim()) {
        toast.error("Please Select Your Bank");
        return;
      }
      if (!formData.accountName.trim()) {
        toast.error("Please Enter Your Account Name");
        return;
      }
      if (!formData.accountNumber.trim()) {
        toast.error("Please Enter Your Account Number");
        return;
      }
      if (formData.accountNumber.length !== 16) {
        toast.error("Account number must be 16 digits long");
        return;
      }
    }
    try {
      setIsLoading(true);
      await axios.post(
        "https://bus-line-backend.onrender.com/api/auth/signup-driver",
        formData
      );
      toast.success("Driver Created Successfully");
      setShowConfirmation(true);
    } catch (error) {
      console.log("Error In Create Driver:", error.message);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Error creating driver");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="p-4 bg-gray-50 h-screen">
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-white",
            color: "text-neutral-900",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="p-4 bg-gray-50 ">
        <nav className="h-[10vh] flex justify-start items-center px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-3 mr-2">
              <img
                src="/logoPng.png"
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
            className="bg-transparent hover:bg-blue-500  text-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500  hover:border-transparent rounded disabled:opacity-50 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={
              currentStep === steps.length - 1 ? handleFinish : goToNextStep
            }
            disabled={currentStep === steps.length - 1 && showConfirmation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 cursor-pointer"
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
                <div className="bg-blue-500 text-white rounded-full p-2 mr-2"></div>
                <h3 className="text-lg font-medium">
                  Your Request is Under Review
                </h3>
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
