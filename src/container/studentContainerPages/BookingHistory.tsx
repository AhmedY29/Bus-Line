import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";

const BookingHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const bookingHistory = [
    {
      id: "BK2024001",
      route: "New York → Boston",
      date: "2024-01-15",
      time: "09:00",
      status: "completed",
      amount: 47.00,
      passengers: 2,
      busNumber: "BUS-123"
    },
    {
      id: "BK2023120",
      route: "Boston → New York",
      date: "2023-12-20",
      time: "14:30",
      status: "completed",
      amount: 45.00,
      passengers: 1,
      busNumber: "BUS-456"
    },
    {
      id: "BK2023115",
      route: "New York → Philadelphia",
      date: "2023-11-15",
      time: "11:00",
      status: "cancelled",
      amount: 35.00,
      passengers: 1,
      busNumber: "BUS-789"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookingHistory.filter(booking => {
    const matchesSearch = booking.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Booking History</CardTitle>
            <p className="text-gray-600">View all your past and upcoming bus bookings</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by route or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Bookings</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{booking.route}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Booking ID:</span>
                            <p>{booking.id}</p>
                          </div>
                          <div>
                            <span className="font-medium">Date:</span>
                            <p>{booking.date}</p>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <p>{booking.time}</p>
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span>
                            <p className="text-green-600 font-semibold">${booking.amount}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === "completed" && (
                          <Button variant="outline" size="sm">
                            Rate Trip
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingHistory; 