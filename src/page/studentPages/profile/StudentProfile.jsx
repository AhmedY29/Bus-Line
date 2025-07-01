
import { Camera, Edit, Mail, Phone, MapPin, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const StudentProfile = () => {
  const studentData = {
    id: "2024001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+201234567890",
    address: "Maadi, Cairo, Egypt",
    joinDate: "September 2024",
    totalTrips: 47,
    activeBookings: 2,
    status: "Active"
  };

  return (
    <div className="p-2 space-y-6">
      {/* Profile Header */}
      <Card className="bus-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src="/placeholder.svg" alt="Ahmed Hassan" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">AH</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{studentData.name}</h1>
                <Badge className="bg-green-100 text-green-700 w-fit mx-auto md:mx-0">
                  {studentData.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">Student ID: {studentData.id}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {studentData.joinDate}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="font-semibold">{studentData.totalTrips}</span>
                  <span>Total Trips</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="font-semibold">{studentData.activeBookings}</span>
                  <span>Active Bookings</span>
                </div>
              </div>
            </div>

            <Button className="gradient-button">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bus-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personal Information
            </CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-gray-900 font-medium">{studentData.name}</p>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{studentData.email}</p>
              </div>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <div className="flex items-center space-x-2 mt-1">
                <Phone className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{studentData.phone}</p>
              </div>
            </div>
            <Separator />
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{studentData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card className="bus-card border-0">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your activity summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{studentData.totalTrips}</p>
                <p className="text-sm text-gray-600">Total Trips</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{studentData.activeBookings}</p>
                <p className="text-sm text-gray-600">Active Bookings</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold">12 trips</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Favorite Route</span>
                <span className="font-semibold">Maadi → Downtown</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">4.8</span>
                  <span className="text-yellow-500">★</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12">
              <Edit className="h-5 w-5 mr-2" />
              Edit Personal Info
            </Button>
            <Button variant="outline" className="h-12">
              <Phone className="h-5 w-5 mr-2" />
              Change Phone
            </Button>
            <Button variant="outline" className="h-12">
              <MapPin className="h-5 w-5 mr-2" />
              Update Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
