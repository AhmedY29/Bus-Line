import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const BookingConfirmation: React.FC = () => {
  const bookingDetails = {
    bookingId: "BK2024001",
    route: "New York → Boston",
    date: "2024-01-15",
    time: "09:00",
    passengers: 2,
    totalAmount: 47.00,
    seats: ["A3", "A4"],
    busNumber: "BUS-123",
    driver: "John Smith",
    departureStation: "Port Authority Bus Terminal",
    arrivalStation: "South Station"
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Booking Confirmed!
            </CardTitle>
            <p className="text-green-600">Your bus ticket has been successfully booked</p>
          </CardHeader>
        </Card>

        <div className="mt-6 space-y-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Booking ID:</span>
                  <span className="font-bold text-blue-600">{bookingDetails.bookingId}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Route</span>
                    <p className="font-medium">{bookingDetails.route}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date</span>
                    <p className="font-medium">{bookingDetails.date}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Time</span>
                    <p className="font-medium">{bookingDetails.time}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Passengers</span>
                    <p className="font-medium">{bookingDetails.passengers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Trip Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Departure</p>
                      <p className="text-sm text-gray-600">{bookingDetails.departureStation}</p>
                    </div>
                  </div>
                  <div className="ml-1.5 mt-2 h-8 border-l-2 border-blue-300"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Arrival</p>
                      <p className="text-sm text-gray-600">{bookingDetails.arrivalStation}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Bus Number</span>
                    <p className="font-medium">{bookingDetails.busNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Driver</span>
                    <p className="font-medium">{bookingDetails.driver}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Seats</span>
                    <p className="font-medium">{bookingDetails.seats.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <p className="font-medium text-green-600">${bookingDetails.totalAmount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-yellow-800">Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• Please arrive at least 15 minutes before departure time</li>
                <li>• Bring a valid ID and your booking confirmation</li>
                <li>• Check your email for the e-ticket</li>
                <li>• Contact support if you need to modify your booking</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Download Ticket
            </Button>
            <Button className="flex-1" variant="outline">
              View Booking History
            </Button>
            <Button className="flex-1" variant="outline">
              Track Bus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 