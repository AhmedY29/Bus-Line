import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    licenseImage: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    vehicleName: "",
    vehicleImage: "",
    vehicleColor: "",
    vehicleModel: "",
    vehicleCapacity: "",
    vehiclePlateNumber: "",
    vehicleYearlyCheck: "",
  });

  const updateField = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      licenseImage: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      vehicleName: "",
      vehicleImage: "",
      vehicleColor: "",
      vehicleModel: "",
      vehicleCapacity: "",
      vehiclePlateNumber: "",
      vehicleYearlyCheck: "",
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => useContext(FormContext);
