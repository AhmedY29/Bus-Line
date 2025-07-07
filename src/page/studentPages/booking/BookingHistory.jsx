import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, MapPin, Bus, Search, Star ,Users} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentGetBookingHistory } from "@/utils/student"; // ✅ Your API function

/**
 * A card component to display booking information.
 * It's designed to receive a `booking` object with populated data from the backend.
 */
const BookingCard = ({ booking }) => {
    const trip = booking.tripId;

    // Helper to prevent rendering a card if trip data is missing
    if (!trip) {
        return null;
    }
    
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-blue-100 text-blue-700'; // 'confirmed' is treated as 'Active'
            case 'completed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    
    return (
        <Card className="booking-card">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <Badge className={`capitalize font-semibold px-3 py-1 rounded-full ${getStatusStyle(booking.status)}`}>
                                {booking.status === 'confirmed' ? 'Active' : booking.status}
                            </Badge>
                            <span className="text-sm text-gray-500">#{booking._id.slice(-6)}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{trip.neighborhood} → {trip.destinationId.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" />{formatDate(trip.tripDateStart)}</div>
                            <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" />{trip.departureTime}</div>
                            <div className="flex items-center"><Bus className="w-4 h-4 mr-2 text-gray-400" />{trip.busNumber || 'BUS-00X'}</div>
                            <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-400" />Driver: {trip.driverId.name}</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start lg:items-end justify-between pt-4 lg:pt-0 border-t lg:border-none">
                        <span className="text-2xl font-bold text-gray-900 mb-2 lg:mb-0">{trip.tripPrice} SAR</span>
                        {booking.status === 'completed' && !booking.rating && (
                            <Button variant="outline" size="sm">Rate Trip</Button>
                        )}
                        {booking.status === 'confirmed' && (
                             <Button variant="outline" size="sm">Track Live</Button>
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

    //  Fetch data whenever filters change
    useEffect(() => {
        // First, check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You must be logged in to view your history.");
            setLoading(false);
            return;
        }

        // Use a timer to debounce search input, preventing excessive API calls
        const handler = setTimeout(() => {
            setLoading(true);
            setError(null);
            const apiFilters = {
                search: filters.search,
                status: filters.status === 'all' ? '' : filters.status,
            };
            studentGetBookingHistory(apiFilters)
                .then(response => setBookings(response.data))
                .catch(err => {
                    setError("Failed to load booking history.");
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(handler); // Cleanup timer
    }, [filters]);

    // Memoize the grouped lists to prevent re-calculation on every render
    const groupedBookings = useMemo(() => ({
        confirmed: bookings.filter(b => b.status === 'confirmed'),
        completed: bookings.filter(b => b.status === 'completed'),
        cancelled: bookings.filter(b => b.status === 'cancelled'),
    }), [bookings]);

    const renderBookingList = (bookingList) => {
        if (bookingList.length === 0) {
            return <div className="text-center py-12 text-gray-500">No bookings found in this category.</div>;
        }
        return bookingList.map((booking) => <BookingCard key={booking._id} booking={booking} />);
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
                            onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                            className="pl-10"
                        />
                    </div>
                    <Select value={filters.status} onValueChange={(value) => setFilters(f => ({ ...f, status: value }))}>
                        <SelectTrigger className="w-full md:w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Bookings</SelectItem>
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
                    <TabsTrigger value="active">Active ({groupedBookings.confirmed.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({groupedBookings.completed.length})</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled ({groupedBookings.cancelled.length})</TabsTrigger>
                </TabsList>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : (
                    <>
                        <TabsContent value="all" className="space-y-4">{renderBookingList(bookings)}</TabsContent>
                        <TabsContent value="active" className="space-y-4">{renderBookingList(groupedBookings.confirmed)}</TabsContent>
                        <TabsContent value="completed" className="space-y-4">{renderBookingList(groupedBookings.completed)}</TabsContent>
                        <TabsContent value="cancelled" className="space-y-4">{renderBookingList(groupedBookings.cancelled)}</TabsContent>
                    </>
                )}
            </Tabs>
        </div>
    );
};

export default BookingHistory;