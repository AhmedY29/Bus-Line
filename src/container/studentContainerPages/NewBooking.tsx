import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const NewBooking: React.FC = () => {
  const [bookingData, setBookingData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: 1,
    seatPreference: "any"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingData);
    // Handle booking submission logic here
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              New Bus Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <Input
                    type="text"
                    name="from"
                    value={bookingData.from}
                    onChange={handleInputChange}
                    placeholder="Departure location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <Input
                    type="text"
                    name="to"
                    value={bookingData.to}
                    onChange={handleInputChange}
                    placeholder="Destination"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <Input
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Passengers</label>
                  <Input
                    type="number"
                    name="passengers"
                    value={bookingData.passengers}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Seat Preference</label>
                  <select
                    name="seatPreference"
                    value={bookingData.seatPreference}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="any">Any Seat</option>
                    <option value="window">Window Seat</option>
                    <option value="aisle">Aisle Seat</option>
                    <option value="front">Front Seat</option>
                  </select>
                </div>
              </div>

              <Separator />

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="text-sm text-gray-600">
                  <p>Route: {bookingData.from} → {bookingData.to}</p>
                  <p>Date: {bookingData.date}</p>
                  <p>Time: {bookingData.time}</p>
                  <p>Passengers: {bookingData.passengers}</p>
                  <p>Seat Preference: {bookingData.seatPreference}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewBooking; 