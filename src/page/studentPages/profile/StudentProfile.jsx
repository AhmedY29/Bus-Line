import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Camera, Edit, Mail, Phone, MapPin, Calendar, User, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    totalTrips: 0,
    activeBookings: 0,
    joinDate: "",
    status: "Active",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setStudentData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "+966",
          address: parsedUser.address?.addressName || "",
          totalTrips: parsedUser.totalTrips || 0,
          activeBookings: parsedUser.activeBookings || 0,
          joinDate: new Date(parsedUser.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
          status: "Active",
        });
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const handleSave = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const updatedUser = {
          ...parsedUser,
          name: studentData.name,
          email: studentData.email,
          phone: studentData.phone,
          address: {
            ...parsedUser.address,
            addressName: studentData.address,
          },
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setEditMode(false);

        Swal.fire({
          icon: "success",
          title: "تم الحفظ",
          text: "تم تحديث بياناتك بنجاح!",
          confirmButtonColor: "#2563eb",
        });
      } catch (error) {
        console.error("Error updating profile", error);
      }
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bus-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src="/placeholder.svg" alt={studentData.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {studentData.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
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
              <p className="text-gray-600 mb-4">Email: {studentData.email}</p>

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

            <Button onClick={() => setEditMode(true)} className="gradient-button">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </CardTitle>
          <CardDescription>View or edit your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <Input
              disabled={!editMode}
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            />
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <Input
              type="email"
              disabled={!editMode}
              value={studentData.email}
              onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
            />
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <Input
              type="tel"
              disabled={!editMode}
              value={studentData.phone}
              onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
            />
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <Input
              disabled={!editMode}
              value={studentData.address}
              onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
            />
          </div>

          {editMode && (
            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>


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
