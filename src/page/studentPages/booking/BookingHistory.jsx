
import { useState } from "react";
import { Calendar, Clock, MapPin, Bus, Filter, Search, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BookingHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock booking data
  const bookings = [
    {
      id: "BK001",
      destination: "Cairo University",
      neighborhood: "Maadi",
      date: "2024-01-15",
      time: "07:30 AM",
      busNumber: "BUS-001",
      driverName: "Ahmed Mahmoud",
      price: 25,
      status: "active",
      rating: null
    },
    {
      id: "BK002",
      destination: "New Administrative Capital",
      neighborhood: "New Cairo",
      date: "2024-01-10",
      time: "09:00 AM",
      busNumber: "BUS-003",
      driverName: "Mohamed Hassan",
      price: 35,
      status: "completed",
      rating: 5
    },
    {
      id: "BK003",
      destination: "Downtown Cairo",
      neighborhood: "Zamalek",
      date: "2024-01-08",
      time: "08:15 AM",
      busNumber: "BUS-002",
      driverName: "Omar Ali",
      price: 20,
      status: "completed",
      rating: 4
    },
    {
      id: "BK004",
      destination: "Maadi District",
      neighborhood: "Dokki",
      date: "2024-01-05",
      time: "06:45 AM",
      busNumber: "BUS-005",
      driverName: "Hassan Ahmed",
      price: 30,
      status: "cancelled",
      rating: null
    },
    {
      id: "BK005",
      destination: "Cairo University",
      neighborhood: "Giza",
      date: "2024-01-03",
      time: "07:00 AM",
      busNumber: "BUS-001",
      driverName: "Ahmed Mahmoud",
      price: 25,
      status: "completed",
      rating: 5
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const activeBookings = filteredBookings.filter(b => b.status === 'active');
  const completedBookings = filteredBookings.filter(b => b.status === 'completed');
  const cancelledBookings = filteredBookings.filter(b => b.status === 'cancelled');

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage all your bus bookings</p>
      </div>

      {/* Filters */}
      <Card className="bus-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by destination or pickup location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Booking Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({filteredBookings.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} renderStars={renderStars} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} renderStars={renderStars} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} renderStars={renderStars} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} getStatusColor={getStatusColor} renderStars={renderStars} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "You haven't made any bookings yet"
            }
          </p>
          <Button className="gradient-button">
            Make Your First Booking
          </Button>
        </div>
      )}
    </div>
  );
};

const BookingCard = ({ booking, getStatusColor, renderStars }) => (
  <Card className="booking-card">
    <CardContent className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <Badge className={`status-badge ${getStatusColor(booking.status)}`}>
              {booking.status}
            </Badge>
            <span className="text-sm text-gray-500">#{booking.id}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{booking.destination}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>From {booking.neighborhood}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{booking.date}</span>
                <Clock className="w-4 h-4 text-gray-500 ml-2" />
                <span>{booking.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Bus className="w-4 h-4 text-gray-500" />
                <span>{booking.busNumber}</span>
                <span>• {booking.driverName}</span>
              </div>
            </div>
          </div>

          {booking.rating && (
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-600">Your rating:</span>
              <div className="flex space-x-1">
                {renderStars(booking.rating)}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end space-y-3">
          <span className="text-2xl font-bold text-gray-900">{booking.price} EGP</span>
          
          <div className="flex space-x-2">
            {booking.status === 'active' && (
              <>
                <Button variant="outline" size="sm">Track Live</Button>
                <Button variant="outline" size="sm">Contact Driver</Button>
              </>
            )}
            
            {booking.status === 'completed' && !booking.rating && (
              <Button variant="outline" size="sm">Rate Trip</Button>
            )}
            
            <Button variant="ghost" size="sm">View Details</Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BookingHistory;
