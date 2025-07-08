import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  TrendingUp,
  Bus,
  CreditCard,
  Users,
  ArrowRight,
  Bell,
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
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const StudentDashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  ("");

  useEffect(() => {
    const fetchTripsData = async () => {
      try {
        const res = await axios.get(
          `https://bus-line-backend.onrender.com/api/bookings/booking-student`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrips(res.data.bookings);
        console.log(res.data.bookings, "ddd");
      } catch (error) {
        toast.error("Error in Getting Trips ");
      } finally {
        setLoading(false);
      }
    };
    fetchTripsData();
  }, []);
  // Mock data for dashboard
  const stats = {
    totalTrips: trips.length,
    monthlySpending: 180,
    upcomingBookings: trips.filter((trip) => trip.status != "pending").length,
    savedRoutes: 5,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const upcomingTrips = [
    {
      id: 1,
      destination: "Cairo University",
      date: "2024-01-15",
      time: "07:30 AM",
      busNumber: "BUS-001",
      status: "confirmed",
      price: 25,
      driver: "Mohamed Ali",
    },
    {
      id: 2,
      destination: "New Administrative Capital",
      date: "2024-01-16",
      time: "09:00 AM",
      busNumber: "BUS-003",
      status: "pending",
      price: 35,
      driver: "Sarah Ahmed",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Booking Confirmed",
      destination: "Cairo University",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      action: "Payment Processed",
      amount: "25 SAR",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: 3,
      action: "Trip Completed",
      destination: "Maadi District",
      time: "1 day ago",
      status: "completed",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Welcome Section Skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <Skeleton className="w-24 h-4 rounded" />
                </div>
                <Skeleton className="h-10 w-64 mb-3 rounded" />
                <Skeleton className="h-6 w-80" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-14 w-40 rounded-2xl" />
                <Skeleton className="h-14 w-40 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
        {/* Quick Actions Skeleton */}
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-600 rounded-lg p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100 text-sm font-medium">
                  Good Morning
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Welcome back, {user?.name || "Student"}!
              </h1>
              <p className="text-blue-100 text-lg max-w-md">
                Ready for your next journey? Let's get you moving with our
                premium bus service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/student/new-booking">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" /> New Booking
                </Button>
              </Link>
              <Link to="/student/tracking">
                <Button
                  variant="outline"
                  className="border-white text-blue-600 px-8 py-4 rounded-2xl backdrop-blur-sm"
                >
                  <Bus className="w-5 h-5 mr-2" /> Track Bus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bus-card border-0 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Bus className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Trips
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalTrips}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bus-card border-0 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Monthly Spending
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.monthlySpending} SAR
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bus-card border-0 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Upcoming Bookings
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.upcomingBookings}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bus-card border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-blue-600" /> Upcoming
                    Trips
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Your scheduled bookings for the next few days
                  </CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                  {trips.filter((trip) => trip.status == "confirmed").length}{" "}
                  trips
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {trips.length > 0 ? (
                <div className="space-y-4">
                  {trips.map((booking) => (
                    <div
                      key={booking._id}
                      className="booking-card group transition-all duration-300 p-2 border-b"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Bus className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {booking.tripId.destinationId?.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Driver: {booking.tripId.driverId.name}
                              </p>
                              <Badge
                                className={`${
                                  booking.status === "confirmed"
                                    ? "bg-green-500 text-white"
                                    : "bg-orange-500 text-white"
                                } px-3 py-1 rounded-full`}
                              >
                                {booking.status === "confirmed"
                                  ? "Confirmed"
                                  : "Pending"}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">
                                {formatDate(booking.tripId.tripDateStart)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">
                                {booking.tripId.departureTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                              <Bus className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">
                                {booking.tripId.busNumber || "BUS-007"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0 flex items-center justify-between lg:flex-col lg:items-end space-y-2">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              {booking.tripId.tripPrice} SAR
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Link to={"bookings"}>
                              <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                              >
                                View Details
                              </Button>
                            </Link>
                            <Link to={"tracking"}>
                              <Button
                                size="sm"
                                className="gradient-button cursor-pointer"
                              >
                                Track
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No upcoming trips. Time to book a new one!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Enhanced Quick Actions */}
      <Card className="bus-card border-0">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts to make your journey easier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/student/new-booking">
              <div className="group">
                <Button className="w-full gradient-button h-24 flex-col space-y-3 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Plus className="w-8 h-8" />
                  <span className="font-semibold">New Booking</span>
                </Button>
              </div>
            </Link>

            <Link to="/student/tracking">
              <div className="group">
                <Button
                  variant="outline"
                  className="w-full h-24 flex-col space-y-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 group-hover:scale-105"
                >
                  <Bus className="w-8 h-8" />
                  <span className="font-semibold">Track Bus</span>
                </Button>
              </div>
            </Link>

            <Link to="/student/chat">
              <div className="group">
                <Button
                  variant="outline"
                  className="w-full h-24 flex-col space-y-3 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-300 group-hover:scale-105"
                >
                  <Users className="w-8 h-8" />
                  <span className="font-semibold">Messages</span>
                </Button>
              </div>
            </Link>

            <Link to="/student/support">
              <div className="group">
                <Button
                  variant="outline"
                  className="w-full h-24 flex-col space-y-3 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all duration-300 group-hover:scale-105"
                >
                  <Users className="w-8 h-8" />
                  <span className="font-semibold">Get Support</span>
                </Button>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
