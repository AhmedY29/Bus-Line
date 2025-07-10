import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PaymentSuccess = ({ booking, trip, passengers, onClose }) => {
  // Fallback in case props are not passed correctly
  if (!booking || !trip) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Booking information is missing.</p>
      </div>
    );
  }

  const getInitials = (name = "") => {
    //  Safely handle undefined names before calling toUpperCase()
    return (
      (name || "")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "D"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg text-center shadow-lg animate-in fade-in-50">
        <CardHeader>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your payment was successful and your trip is booked.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-left bg-gray-50 p-4 rounded-lg border space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-mono text-sm">
                ...{booking._id.slice(-8)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">Route</span>
              <span className="font-semibold">
                {trip.neighborhood} → {trip.destinationId.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold">
                {new Date(trip.tripDateStart).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Arrival Time</span>
              <span className="font-semibold">{trip.arrivalTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Departure Time</span>
              <span className="font-semibold">{trip.departureTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Driver</span>
              <span className="font-semibold">{trip.driverId.name}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-green-600">
                {trip.tripPrice * passengers} SAR
              </span>
            </div>
          </div>
          <Button onClick={onClose} className="mt-6 w-full">
            Book Another Trip
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
