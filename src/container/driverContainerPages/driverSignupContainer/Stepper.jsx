import React from "react";

const Stepper = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { label: "Personal info", description: "" },
    { label: "Vehicle Details", description: "" },
    { label: "Payment info", description: "" },
  ];

  return (
    <div className="rounded-lg p-6 w-[80%] mx-auto bg-gray-50">
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex-1 px-2">
            <p
              className={`font-semibold ${
                currentStep >= index + 1 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            <p className="text-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;

