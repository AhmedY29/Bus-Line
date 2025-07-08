import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Bus,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

// Helper to get token
const getToken = () => localStorage.getItem("token");

// Fetch bookings
const fetchMyBookings = async () => {
  const token = getToken();
  const res = await axios.get(
    "https://bus-line-backend.onrender.com/api/bookings/booking-student",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return Array.isArray(res.data.bookings) ? res.data.bookings : [];
};

// Cancel booking
const cancelBooking = async (bookingId) => {
  const token = getToken();
  await axios.patch(
    `https://bus-line-backend.onrender.com/api/bookings/${bookingId}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Booking Card Component
const BookingCard = ({ booking, onCancel }) => {
  const trip = booking.tripId;
  if (!trip || !trip.destinationId) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="booking-card">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <Badge
                className={`capitalize font-semibold px-3 py-1 rounded-full ${getStatusStyle(
                  booking.status
                )}`}
              >
                {booking.status === "confirmed" ? "Active" : booking.status}
              </Badge>
              <span className="text-sm text-gray-500">
                #{booking._id.slice(-6)}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {trip.neighborhood} → {trip.destinationId.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                {formatDate(trip.tripDateStart)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {trip.departureTime}
              </div>
              <div className="flex items-center">
                <Bus className="w-4 h-4 mr-2 text-gray-400" />
                {trip.busNumber || "BUS-00X"}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                Driver: {trip.driverId.name}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end justify-between pt-4 lg:pt-0 border-t lg:border-none">
            <span className="text-2xl font-bold text-gray-900 mb-2 lg:mb-0">
              {trip.tripPrice} SAR
            </span>
            {booking.status === "confirmed" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancel(booking._id)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "all" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyBookings();
      setBookings(data);
    } catch (err) {
      setError("Failed to load booking history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCancelingId(bookingId);
    try {
      await cancelBooking(bookingId);
      await loadBookings();
    } catch (err) {
      setError("Failed to cancel booking.");
    } finally {
      setCancelingId(null);
    }
  };

  const groupedBookings = useMemo(
    () => ({
      confirmed: bookings.filter((b) => b.status === "confirmed"),
      completed: bookings.filter((b) => b.status === "completed"),
      cancelled: bookings.filter((b) => b.status === "cancelled"),
    }),
    [bookings]
  );

  const renderBookingList = (bookingList) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      );
    }
    if (bookingList.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No bookings found.
        </div>
      );
    }
    return bookingList.map((booking) => (
      <BookingCard
        key={booking._id}
        booking={booking}
        onCancel={handleCancel}
      />
    ));
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage all your bus bookings</p>
      </div>

      <Card className="bus-card border-0">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by destination..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((f) => ({ ...f, status: value }))
            }
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="confirmed">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {error && <p className="text-center text-red-500">{error}</p>}

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">
            Active ({groupedBookings.confirmed.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({groupedBookings.completed.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({groupedBookings.cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderBookingList(bookings)}</TabsContent>
        <TabsContent value="confirmed">
          {renderBookingList(groupedBookings.confirmed)}
        </TabsContent>
        <TabsContent value="completed">
          {renderBookingList(groupedBookings.completed)}
        </TabsContent>
        <TabsContent value="cancelled">
          {renderBookingList(groupedBookings.cancelled)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingHistory;
