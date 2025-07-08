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
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

const LiveTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tripProgress, setTripProgress] = useState(65);
  const [tripId, setTripId] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate progress update
      setTripProgress((prev) => Math.min(prev + Math.random() * 2, 100));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bookingData = async () => {
      try {
        const res = await axios.get(
          "https://bus-line-backend.onrender.com/api/bookings/booking-student",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(res.data.bookings);
      } catch (error) {
        toast.error("Error in Getting Bookings");
      }
    };
    bookingData();
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
        <h1>Trips</h1>
        <select onChange={(e) => setTripId(e.target.value)} name="" id="">
          <option>Chose Trip</option>
          {bookings
            ?.filter((e) => e.status != "pending")
            ?.map((trip) => (
              <option key={trip._id} value={trip.tripId._id}>
                {trip.tripId.neighborhood} ➡️ {trip.tripId.destinationId.title}
              </option>
            ))}
        </select>
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
          {tripId ? (
            <StudentTrackingMap
              token={localStorage.getItem("token")}
              tripId={tripId}
            />
          ) : (
            <div className="flex items-center justify-center h-100 text-gray-500">
              Select Trip For Tracking
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Link to={"/student/chat"}>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;