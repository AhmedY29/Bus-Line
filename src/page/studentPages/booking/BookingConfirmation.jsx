
import { CheckCircle, Calendar, Clock, MapPin, Bus, Download, Share, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation, Link } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No booking information found.</p>
        <Link to="/student/new-booking">
          <Button className="mt-4">Make a New Booking</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-4">Your booking has been confirmed</p>
        <Badge className="bg-green-100 text-green-700 text-sm px-4 py-2">
          Booking ID: {booking.id.toUpperCase()}
        </Badge>
      </div>

      {/* Booking Details */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <Bus className="w-6 h-6 mr-2 text-blue-600" />
            Trip Details
          </CardTitle>
          <CardDescription>Your confirmed booking information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Route Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">{booking.neighborhood}</p>
                  <p className="text-sm text-blue-700">Pickup Location</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div className="text-right">
                  <p className="font-semibold text-blue-900">{booking.destination.name}</p>
                  <p className="text-sm text-blue-700">Destination</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Bus className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Bus Number</p>
                  <p className="font-semibold">{booking.trip.busNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Travel Date</p>
                  <p className="font-semibold">Today</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Departure Time</p>
                  <p className="font-semibold">{booking.trip.departureTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Arrival Time</p>
                  <p className="font-semibold">{booking.trip.arrivalTime}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ticket Price:</span>
                <span>{booking.trip.price} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee:</span>
                <span>5 EGP</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Paid:</span>
                <span>{booking.trip.price + 5} EGP</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Driver Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">
                  {booking.trip.driverName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold">{booking.trip.driverName}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{booking.trip.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="h-12">
          <Download className="w-5 h-5 mr-2" />
          Download Ticket
        </Button>
        <Button variant="outline" className="h-12">
          <Share className="w-5 h-5 mr-2" />
          Share Booking
        </Button>
      </div>

      {/* Next Steps */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>You'll receive SMS notifications about your trip</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Track your bus live on the day of travel</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span>Contact your driver if needed</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/student">
          <Button variant="outline" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
        <Link to="/student/bookings">
          <Button variant="outline" className="w-full">
            View All Bookings
          </Button>
        </Link>
        <Link to="/student/tracking">
          <Button className="w-full gradient-button">
            Track Bus Live
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
