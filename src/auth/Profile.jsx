import { Camera, Edit, Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const DriverProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Mohammed",
    lastName: "Ali",
    email: "m.ali@gmail.com",
    phoneNumber: "+966501234567",
    address: "Riyadh, Saudi Arabia",
    licenseNumber: "LIC123456789",
    licenseImage: null,
    vehicleRegistration: null,
    carModel: "Toyota Corolla",
    plateNumber: "ABC-1234",
    insuranceExpiry: "2025-12-31",
    bankName: "Al Rajhi Bank",
    accountNumber: "SA12345678901234567890",
    accountName: "Mohammed Ali",
    profileImage: null,
    joinDate: "September 2024",
    totalTrips: 47,
    activeBookings: 2,
    status: "Active",
  });

  const handleEditClick = () => setIsEditing(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, licenseImage: URL.createObjectURL(file) });
    }
  };

  const handleVehicleRegistration = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, vehicleRegistration: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="p-2 space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={user.profileImage || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {`${user.firstName} ${user.lastName}`}
                </h1>
                <Badge className="bg-green-100 text-green-700 w-fit mx-auto md:mx-0">
                  {user.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">Driver ID: {user.email.split("@")[0]}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="font-semibold">{user.totalTrips}</span>
                  <span>Total Trips</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="font-semibold">{user.activeBookings}</span>
                  <span>Active Bookings</span>
                </div>
              </div>
            </div>

            {!isEditing && (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleEditClick}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input name="firstName" value={user.firstName} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="First Name" />
                <Separator />
                <input name="lastName" value={user.lastName} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Last Name" />
                <Separator />
                <input name="email" value={user.email} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Email" />
                <Separator />
                <input name="phoneNumber" value={user.phoneNumber} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Phone" />
                <Separator />
                <input name="address" value={user.address} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Address" />
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-gray-900 font-medium">{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{user.phoneNumber}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-900">{user.address}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Vehicle & License Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Vehicle & License Info</CardTitle>
            <CardDescription>Details about your vehicle and driver license</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input name="carModel" value={user.carModel} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Car Model" />
                <Separator />
                <input name="plateNumber" value={user.plateNumber} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Plate Number" />
                <Separator />
                <input name="insuranceExpiry" type="date" value={user.insuranceExpiry} onChange={handleChange} className="w-full border px-3 py-1 rounded" />
                <Separator />
                <input name="licenseNumber" value={user.licenseNumber} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="License Number" />
                <Separator />

                {/* License Image */}
                <div>
                  <label className="text-sm font-medium text-gray-600">Upload License Image</label>
                  <input type="file" accept="image/*" onChange={handleLicenseImageChange} className="mt-1 block w-full text-sm" />
                  {user.licenseImage && <img src={user.licenseImage} alt="License" className="mt-2 h-32 rounded border object-cover" />}
                </div>
                <Separator />

                {/* Vehicle Registration */}
                <div>
                  <label className="text-sm font-medium text-gray-600">Upload Vehicle Registration</label>
                  <input type="file" accept="image/*" onChange={handleVehicleRegistration} className="mt-1 block w-full text-sm" />
                  {user.vehicleRegistration && <img src={user.vehicleRegistration} alt="Vehicle Registration" className="mt-2 h-32 rounded border object-cover" />}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-sm text-gray-600">Car Model</span><span className="font-semibold">{user.carModel}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-sm text-gray-600">Plate Number</span><span className="font-semibold">{user.plateNumber}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-sm text-gray-600">Insurance Expiry</span><span className="font-semibold">{user.insuranceExpiry}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-sm text-gray-600">License No.</span><span className="font-semibold">{user.licenseNumber}</span></div>
                  <Separator />
                  <span className="text-sm text-gray-600">License Image</span>
                  {user.licenseImage ? (
                    <img src={user.licenseImage} alt="License" className="mt-2 h-32 rounded border object-cover" />
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">No license image</p>
                  )}
                  <Separator />
                  <span className="text-sm text-gray-600">Vehicle Registration</span>
                  {user.vehicleRegistration ? (
                    <img src={user.vehicleRegistration} alt="Vehicle Registration" className="mt-2 h-32 rounded border object-cover" />
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">No registration image</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Bank Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Bank Account</CardTitle>
            <CardDescription>Payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input name="bankName" value={user.bankName} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Bank Name" />
                <Separator />
                <input name="accountNumber" value={user.accountNumber} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Account Number" />
                <Separator />
                <input name="accountName" value={user.accountName} onChange={handleChange} className="w-full border px-3 py-1 rounded" placeholder="Account Holder Name" />
              </>
            ) : (
              <>
                <div className="flex justify-between"><span className="text-sm text-gray-600">Bank</span><span className="font-semibold">{user.bankName}</span></div>
                <Separator />
                <div className="flex justify-between"><span className="text-sm text-gray-600">Account</span><span className="font-semibold">{user.accountNumber}</span></div>
                <Separator />
                <div className="flex justify-between"><span className="text-sm text-gray-600">Account Holder</span><span className="font-semibold">{user.accountName}</span></div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="text-center">
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
            Submit Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default DriverProfile;
