import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  Bus,
  Zap,
  Route,
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
import StudentTrackingMap from "./StudentTrackingMap";

const LiveTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tripProgress, setTripProgress] = useState(65);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate progress update
      setTripProgress((prev) => Math.min(prev + Math.random() * 2, 100));
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
    status: "on_route",
  };

  const tripStops = [
    {
      name: "Maadi Pickup Point",
      time: "07:30 AM",
      status: "completed",
      delay: 0,
    },
    {
      name: "Ring Road Junction",
      time: "08:15 AM",
      status: "completed",
      delay: 2,
    },
    { name: "Nasr City Center", time: "08:45 AM", status: "current", delay: 5 },
    {
      name: "Cairo University Gate",
      time: "09:15 AM",
      status: "upcoming",
      delay: 7,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Live Trip Tracking
        </h1>
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
              <CardDescription>
                Bus {activeTrip.busNumber} to {activeTrip.destination}
              </CardDescription>
            </div>
            <Badge className="status-badge status-active animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Enhanced Mock Map Area */}
          <StudentTrackingMap
            token={localStorage.getItem("token")}
            tripId={"686b8d3be55633ed569c63e7"}
          />
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
                <p className="font-semibold text-blue-900">
                  {activeTrip.nextStop}
                </p>
              </div>
            </div>
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
              <CardDescription>
                Real-time updates on your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="trip-timeline">
                {tripStops.map((stop, index) => (
                  <div key={index} className="trip-step">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3
                          className={`font-semibold ${
                            stop.status === "current"
                              ? "text-blue-600"
                              : stop.status === "completed"
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
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
                      <Badge
                        className={`w-25 status-badge ${
                          stop.status === "current"
                            ? "status-active"
                            : stop.status === "completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >
                        {stop.status === "current"
                          ? "En Route"
                          : stop.status === "completed"
                          ? "Completed"
                          : "Upcoming"}
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
              <CardTitle className="text-lg font-bold">
                Trip Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bus Number</span>
                <span className="font-semibold">{activeTrip.busNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Departure</span>
                <span className="font-semibold">
                  {activeTrip.departureTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Est. Arrival</span>
                <span className="font-semibold text-orange-600">
                  {activeTrip.actualArrival}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Passengers</span>
                <span className="font-semibold">
                  {activeTrip.passengerCount}/40
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Driver Information
              </CardTitle>
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
                Bus is currently at {activeTrip.currentLocation}. Estimated
                arrival in 12 minutes.
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
