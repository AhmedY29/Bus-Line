import { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, Phone, MessageCircle, Bus, Zap, Route } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const LiveTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tripProgress, setTripProgress] = useState(65);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate progress update
      setTripProgress(prev => Math.min(prev + Math.random() * 2, 100));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock active trip data
  const activeTrip = {
    id: "BK001",
    busNumber: "BUS-001",
    destination: "Cairo University",
    departureTime: "07:30 AM",
    estimatedArrival: "09:15 AM",
    actualArrival: "09:22 AM",
    driverName: "Ahmed Mahmoud",
    driverPhone: "+20 1xx xxx xxxx",
    currentLocation: "Ring Road - Nasr City",
    nextStop: "Cairo University Main Gate",
    passengerCount: 28,
    status: "on_route"
  };

  const tripStops = [
    { name: "Maadi Pickup Point", time: "07:30 AM", status: "completed", delay: 0 },
    { name: "Ring Road Junction", time: "08:15 AM", status: "completed", delay: 2 },
    { name: "Nasr City Center", time: "08:45 AM", status: "current", delay: 5 },
    { name: "Cairo University Gate", time: "09:15 AM", status: "upcoming", delay: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Trip Tracking</h1>
        <p className="text-gray-600">Track your bus in real-time</p>
      </div>

      {/* Live Map Card - Enhanced Design */}
      <Card className="bus-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center">
                <Navigation className="w-6 h-6 mr-2 text-blue-600" />
                Live Location
              </CardTitle>
              <CardDescription>Bus {activeTrip.busNumber} to {activeTrip.destination}</CardDescription>
            </div>
            <Badge className="status-badge status-active animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Enhanced Mock Map Area */}
          <div className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl h-80 md:h-96 mb-6 overflow-hidden border-2 border-blue-100">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>
            
            {/* Route Path */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 50 350 Q 200 300 350 250 Q 500 200 650 150"
                stroke="#3B82F6"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
            </svg>
            
            {/* Bus Icon with Animation */}
            <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Bus className="w-7 h-7 text-white" />
                </div>
                {/* Location Pulse */}
                <div className="absolute inset-0 w-12 h-12 bg-blue-400 rounded-lg animate-ping opacity-30" />
              </div>
            </div>
            
            {/* Destination Markers */}
            <div className="absolute top-6 left-8">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-md">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Start</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-8">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-md">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm font-medium">Destination</span>
              </div>
            </div>
            
            {/* Speed and ETA Info */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-xs text-gray-600">km/h</div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">12</div>
                <div className="text-xs text-gray-600">min ETA</div>
              </div>
            </div>
            
            {/* Modern Map Controls */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 space-y-2">
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/90">
                +
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/90">
                -
              </Button>
              <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/90">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">Current Location</p>
                <p className="text-blue-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {activeTrip.currentLocation}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600">Next Stop</p>
                <p className="font-semibold text-blue-900">{activeTrip.nextStop}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Trip Progress</span>
              <span>{Math.round(tripProgress)}% Complete</span>
            </div>
            <Progress value={tripProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Timeline */}
        <div className="lg:col-span-2">
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Route className="w-6 h-6 mr-2 text-blue-600" />
                Trip Timeline
              </CardTitle>
              <CardDescription>Real-time updates on your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="trip-timeline">
                {tripStops.map((stop, index) => (
                  <div key={index} className="trip-step">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          stop.status === 'current' ? 'text-blue-600' : 
                          stop.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {stop.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Scheduled: {stop.time}
                          {stop.delay > 0 && (
                            <span className="text-orange-600 ml-2">
                              (+{stop.delay} min delay)
                            </span>
                          )}
                        </p>
                      </div>
                      <Badge className={`status-badge ${
                        stop.status === 'current' ? 'status-active' : 
                        stop.status === 'completed' ? 'status-completed' : 'status-pending'
                      }`}>
                        {stop.status === 'current' ? 'En Route' : 
                         stop.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trip Info & Actions */}
        <div className="space-y-6">
          {/* Trip Information */}
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Trip Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bus Number</span>
                <span className="font-semibold">{activeTrip.busNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Departure</span>
                <span className="font-semibold">{activeTrip.departureTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Est. Arrival</span>
                <span className="font-semibold text-orange-600">{activeTrip.actualArrival}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Passengers</span>
                <span className="font-semibold">{activeTrip.passengerCount}/40</span>
              </div>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">AM</span>
                </div>
                <div>
                  <p className="font-semibold">{activeTrip.driverName}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">4.8 rating</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Driver
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Emergency Alert
              </Button>
              <Button variant="outline" className="w-full">
                Share Location
              </Button>
              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Updates */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="font-semibold text-green-800">Live Update</p>
              <p className="text-sm text-green-700">
                Bus is currently at {activeTrip.currentLocation}. Estimated arrival in 12 minutes.
              </p>
              <p className="text-xs text-green-600 mt-1">
                Last updated: {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;