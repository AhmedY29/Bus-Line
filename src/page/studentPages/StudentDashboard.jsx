import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Plus, TrendingUp, Bus, CreditCard, Users, Star, ArrowRight, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router";
import axios from "axios";

// Helper functions to fetch data from the API
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token || user?.accessToken || "";
};

// Fetch destinations
const fetchDestinations = async () => {
  const res = await axios.get("https://bus-line-backend.onrender.com/api/destination/", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data.destinations || [];
};

// Fetch trips
const fetchTrips = async () => {
  const res = await axios.get("https://bus-line-backend.onrender.com/api/trips", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data.trips || [];
};

// Fetch bookings
const fetchBookings = async () => {
  const res = await axios.get("https://bus-line-backend.onrender.com/api/bookings/booking-student", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data.bookings || [];
};

const StudentDashboard = () => {
  // Ensure 'user' is fetched from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [destinations, setDestinations] = useState([]);
  const [activeTrips, setActiveTrips] = useState([]); // To store active trips
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalTrips: 0,
    monthlySpending: 0,
    upcomingBookings: 0,
    savedRoutes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all necessary data
        const [destinationsData, tripsData, bookingsData] = await Promise.all([
          fetchDestinations(),
          fetchTrips(),
          fetchBookings()
        ]);

        setDestinations(destinationsData);
        // Filter active trips
        setActiveTrips(tripsData.filter((trip) => trip.status === "active")); // Only active trips

        // Stats Calculation
        setStats({
          totalTrips: tripsData.length,
          monthlySpending: 180,  // Replace with actual data once available
          upcomingBookings: bookingsData.filter(b => new Date(b.subscriptionStart) > new Date()).length,
          savedRoutes: destinationsData.length
        });

      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
                <span className="text-blue-100 text-sm font-medium">Good Morning</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-blue-100 text-lg max-w-md">
                Ready for your next journey? Let's get you moving with our premium bus service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/student/new-booking">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" />
                  New Booking
                </Button>
              </Link>
              <Link to="/student/tracking">
                <Button variant="outline" className="border-white text-blue-600 px-8 py-4 rounded-2xl backdrop-blur-sm">
                  <Bus className="w-5 h-5 mr-2" />
                  Track Bus
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
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Trips</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalTrips}</p>
              <p className="text-sm text-green-600 font-medium">from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bus-card border-0 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">Monthly subscription</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Spending</p>
              <p className="text-3xl font-bold text-gray-900">180 SAR</p>
              <div className="mt-3">
                {/* <Progress value={75} className="h-2 bg-orange-100" /> */}
                {/* <p className="text-xs text-gray-500 mt-1">75% of monthly budget</p> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bus-card border-0 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                Soon
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.upcomingBookings}</p>
              <p className="text-sm text-blue-600 font-medium">Next: Tomorrow 7:30 AM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Upcoming Trips */}
        <div className="lg:col-span-2">
          <Card className="bus-card border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                    Upcoming Trips
                  </CardTitle>
                  <CardDescription className="mt-1">Your scheduled bookings for the next few days</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">{activeTrips.length} trips</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTrips.map((trip) => (
                  <div key={trip.id} className="booking-card group transition-all duration-300 p-2">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                              <Bus className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{trip.destination}</h3>
                              <p className="text-sm text-gray-600">Driver: {trip.driver}</p>

                              {/* Badge with dynamic color based on status */}
                              <Badge className={`${trip.status === "confirmed" ? "bg-green-500 text-white" : "bg-orange-500 text-white"} px-3 py-1 rounded-full`}>
                                {trip.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{trip.tripDateStart}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{trip.arrivalTime}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                            <Bus className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{trip.busNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 flex items-center justify-between lg:flex-col lg:items-end space-y-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{trip.tripPrice} SAR</p>
                        </div>
                        <div className="flex space-x-2 mt-12 mx-7">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">View Details</Button>
                          <Button size="sm" className={`${trip.status === "confirmed" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-white hover:bg-gray-500"} gradient-button`}>
                            {trip.status === "confirmed" ? "Track" : "Pending"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/student/bookings">
                  <Button variant="outline" className="px-8 py-3 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                    View All Bookings <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
