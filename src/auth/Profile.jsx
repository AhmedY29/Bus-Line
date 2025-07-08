import {
  Camera,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
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

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
    }
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, licenseImage: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bus-line-backend.onrender.com/api/auth/edit-user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser.user));
      setUser(updatedUser.user);
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: " Failed update",
        text: error.message || "Error",
      });
    }
  };

  const handleCancelEdit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All unsaved changes will be discarded.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Keep Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        }
        setIsEditing(false);
        Swal.fire({
          icon: "info",
          title: "Canceled Success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (!user)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage
                  src={user.profileImage || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-6xl font-bold">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="absolute bottom-0 right-0 opacity-0 w-full h-full cursor-pointer"
                />
              )}
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <Badge className="bg-green-100 text-green-700 w-fit mx-auto md:mx-0">
                  {user.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">
                Driver ID: {user.email?.split("@")[0]}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
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
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="First Name"
                />
                <Separator />
                <input
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Last Name"
                />
                <Separator />
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Email"
                />
                <Separator />
                <input
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Phone"
                />
                <Separator />
                <input
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Address"
                />
              </>
            ) : (
              <>
                <div>
                  <label>Name</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <Separator />
                <div>
                  <label>Email</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <Separator />
                <div>
                  <label>Phone</label>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Vehicle & License Info</CardTitle>
            <CardDescription>
              Details about your vehicle and driver license
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLicenseImageChange}
                  className="w-full border px-3 py-1 rounded"
                />
                {user.licenseImage && (
                  <img
                    src={user.licenseImage}
                    alt="License"
                    className="mt-2 h-32 border rounded object-cover"
                  />
                )}
              </>
            ) : (
              <>
                <label className="text-sm text-gray-600">License Image</label>
                {user.licenseImage ? (
                  <img
                    src={user.licenseImage}
                    alt="License"
                    className="mt-2 h-32 border rounded object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No license image</p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Bank Account</CardTitle>
            <CardDescription>Payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <input
                  name="bankName"
                  value={user.bankName}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Bank Name"
                />
                <Separator />
                <input
                  name="accountNumber"
                  value={user.accountNumber}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Account Number"
                />
                <Separator />
                <input
                  name="accountName"
                  value={user.accountName}
                  onChange={handleChange}
                  className="w-full border px-3 py-1 rounded"
                  placeholder="Account Holder Name"
                />
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bank</span>
                  <span className="font-semibold">
                    {user.bankAccount?.bankName || "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account Number</span>
                  <span className="font-semibold">
                    {user.bankAccount?.accountNumber || "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account Name</span>
                  <span className="font-semibold">
                    {user.bankAccount?.accountName || "N/A"}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="text-center flex justify-center gap-4 mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Changes
          </Button>
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default DriverProfile;
