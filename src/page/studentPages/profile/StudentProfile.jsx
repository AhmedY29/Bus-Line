import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Camera,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Save,
  Loader2,
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
import { Input } from "@/components/ui/input";
import axios from "axios";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coordinate: "",
    totalTrips: 0,
    activeBookings: 0,
    joinDate: "",
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinateString = `${latitude.toFixed(6)}, ${longitude.toFixed(
          6
        )}`;
        setStudentData((prev) => ({
          ...prev,
          coordinate: coordinateString,
        }));
        toast.success("Location updated successfully!");
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get current location. Please enter manually.");
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const parseCoordinate = (coordinateStr) => {
    if (!coordinateStr) return { lat: 0, lng: 0 };

    // Handle Google Maps link format
    const googleMapsMatch = coordinateStr.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (googleMapsMatch) {
      return {
        lat: parseFloat(googleMapsMatch[1]),
        lng: parseFloat(googleMapsMatch[2]),
      };
    }

    // Handle comma-separated coordinates
    const coords = coordinateStr.split(",").map((coord) => coord.trim());
    if (coords.length === 2) {
      const lat = parseFloat(coords[0]);
      const lng = parseFloat(coords[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    return { lat: 0, lng: 0 };
  };

  const fetchStudentTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      const response = await axios.get(
        "https://bus-line-backend.onrender.com/api/bookings/booking-student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("Fetched Trips Data:", data.bookings);

      // Update student data with trip counts
      setStudentData((prev) => ({
        ...prev,
        totalTrips: data.bookings?.length || 0,
        activeBookings:
          data.bookings?.filter((booking) => booking.status === "confirmed")
            .length || 0,
      }));
      console.log("Updated Student Data:", {
        totalTrips: data.bookings?.length || 0,
        activeBookings:
          data.bookings?.filter((booking) => booking.status === "confirmed")
            .length || 0,
      });

      if (response.status === 200) {
        // Process the trip data as needed
      } else {
        toast.error(data.message || "Failed to fetch trips");
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Network error. Please try again.");
    }
  };
  useEffect(() => {
    fetchStudentTrips();
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setStudentData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          address: parsedUser.address?.addressName || "",
          coordinate: parsedUser.address?.coordinate
            ? `${parsedUser.address.coordinate.lat}, ${parsedUser.address.coordinate.lng}`
            : "",
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

  const handleSave = async () => {
    // Validate required fields
    if (!studentData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!studentData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate coordinates if provided
    if (studentData.coordinate.trim()) {
      const coordinateObj = parseCoordinate(studentData.coordinate);
      if (
        coordinateObj.lat === 0 &&
        coordinateObj.lng === 0 &&
        studentData.coordinate.trim() !== "0, 0"
      ) {
        toast.error(
          "Please enter valid coordinates or paste a Google Maps link"
        );
        return;
      }
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const coordinateObj = parseCoordinate(studentData.coordinate);

      const updatedData = {
        name: studentData.name,
        email: studentData.email,
        address: {
          addressName: studentData.address,
          coordinate: coordinateObj,
        },
      };

      const response = await axios.patch(
        "https://bus-line-backend.onrender.com/api/auth/edit-user",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const updatedUser = {
            ...parsedUser,
            ...data.user,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
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
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {studentData.name}
                </h1>
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
                  <span className="font-semibold">
                    {studentData.totalTrips}
                  </span>
                  <span>Total Trips</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <span className="font-semibold">
                    {studentData.activeBookings}
                  </span>
                  <span>Active Bookings</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setEditMode(true)}
              className="gradient-button"
              disabled={loading}
            >
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
          <CardDescription>
            View or edit your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              disabled={!editMode}
              value={studentData.name}
              onChange={(e) =>
                setStudentData({ ...studentData, name: e.target.value })
              }
              className={
                !studentData.name.trim() && editMode ? "border-red-300" : ""
              }
            />
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              disabled={!editMode}
              value={studentData.email}
              onChange={(e) =>
                setStudentData({ ...studentData, email: e.target.value })
              }
              className={
                !studentData.email.trim() && editMode ? "border-red-300" : ""
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Address</label>
            <Input
              disabled={!editMode}
              value={studentData.address}
              onChange={(e) =>
                setStudentData({ ...studentData, address: e.target.value })
              }
            />
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium text-gray-600">
              Coordinate (Latitude, Longitude)
            </label>
            <div className="flex gap-2 mt-1">
              <Input
                disabled={!editMode}
                value={studentData.coordinate}
                onChange={(e) =>
                  setStudentData({ ...studentData, coordinate: e.target.value })
                }
                placeholder="Enter coordinates (e.g., 31.9539, 35.9106) or paste Google Maps link"
              />
              {editMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={loadingLocation}
                  className="whitespace-nowrap"
                >
                  {loadingLocation ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  {loadingLocation ? "Getting..." : "Current Location"}
                </Button>
              )}
              {!editMode && studentData.coordinate && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${studentData.coordinate}`,
                      "_blank"
                    )
                  }
                  className="whitespace-nowrap"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You can paste a Google Maps link or enter coordinates manually
            </p>
          </div>

          {editMode && (
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
