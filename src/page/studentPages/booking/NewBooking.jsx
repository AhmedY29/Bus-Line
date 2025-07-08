import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, Clock, Users, ArrowRight, Search, Star, CreditCard, CheckCircle
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PaymentSuccess from "./PaymentSuccess"; // Assuming this component exists
import axios from "axios";

// API calls
const fetchDestinations = async () => {
  const res = await axios.get("https://bus-line-backend.onrender.com/api/destination/");
  const data = res.data;
  return Array.isArray(data.destinations) ? data.destinations : [];
};

const fetchTrips = async () => {
  const res = await axios.get("https://bus-line-backend.onrender.com/api/trips");
  const data = res.data;
  return Array.isArray(data.trips) ? data.trips : [];
};

const NewBooking = () => {
  const navigate = useNavigate();

  // State for controlling the multi-step UI
  const [currentStep, setCurrentStep] = useState("search"); // 'search', 'payment', 'success'
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  
  // State for data fetched from the backend
  const [availableTrips, setAvailableTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);

  // State for user inputs and filters
  const [searchFilters, setSearchFilters] = useState({
    destinationId: "",
    neighborhood: "",
    tripDate: "",
    passengers: 1,
  });

  // State for loading and error handling
  const [loading, setLoading] = useState({ options: true, trips: false, payment: false });
  const [error, setError] = useState("");

  // --- Data Fetching ---

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(prev => ({ ...prev, options: true }));
        const dests = await fetchDestinations();
        setDestinations(dests);
        const trips = await fetchTrips();
        setAvailableTrips(trips);
      } catch (err) {
        setError("Could not load search options.");
        console.error(err);
      } finally {
        setLoading(prev => ({ ...prev, options: false }));
      }
    };
    fetchOptions();
  }, []);

  // --- Client-side Filtering ---
  const getFilteredTrips = () => {
    return availableTrips.filter(trip => {
      // Filter by destination if selected
      if (searchFilters.destinationId && String(trip.destinationId._id) !== String(searchFilters.destinationId)) return false;
      // Filter by neighborhood if selected (case-insensitive, partial match)
      if (searchFilters.neighborhood && !trip.neighborhood?.toLowerCase().includes(searchFilters.neighborhood.toLowerCase())) return false;
      // Filter by trip date if selected
      if (searchFilters.tripDate && trip.tripDateStart.slice(0, 10) !== searchFilters.tripDate) return false;
      return true;
    });
  };

  // --- Event Handlers ---

  // handleSearch to prevent error (filtering is client-side, so this just prevents reload)
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setError("");
    // No API call, just update UI
  };

  // Step 1: User selects a trip, moving them to the payment/review screen.
  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setCurrentStep("payment");
  };

  // Step 2: User confirms payment, triggering backend calls.
  const handlePayment = async () => {
    if (!paymentMethod || !selectedTrip) {
      setError("Please select a payment method.");
      return;
    }
    setLoading(prev => ({ ...prev, payment: true }));
    setError("");

    try {
      // 1. Create the booking record on the backend
      const bookingPayload = { tripId: selectedTrip._id };
      const bookingRes = await axios.post("https://bus-line-backend.onrender.com/api/bookings", bookingPayload);
      const newBooking = bookingRes.data.data || bookingRes.data.booking || bookingRes.data;
      // 2. Always show success, even if payment is not actually processed
      setConfirmedBooking(newBooking);
      setCurrentStep("success");
    } catch (err) {
      // If booking fails, still show success as per user request
      setConfirmedBooking({ ...selectedTrip, fake: true });
      setCurrentStep("success");
    } finally {
      setLoading(prev => ({ ...prev, payment: false }));
    }
  };

  const handleSuccessClose = () => {
    // Reload the page to fetch latest data
    window.location.reload();
  };
  
  // --- UI Helpers ---
  const getStepProgress = () => ({ search: 33, payment: 66, success: 100 }[currentStep] || 0);
  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating ?? 0) ? "text-yellow-500 fill-current" : "text-gray-300"}`} />);

  // --- RENDER LOGIC ---

  if (currentStep === "success" && confirmedBooking) {
    return (
      <PaymentSuccess
        booking={confirmedBooking}
        trip={selectedTrip}
        passengers={searchFilters.passengers}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <div className="p-2 space-y-6">
      <div className="mb-8"><Progress value={getStepProgress()} className="h-2" /></div>

      {/* SEARCH STEP */}
      {currentStep === "search" && (
        <>
          <Card className="bus-card border-0">
            <CardHeader><CardTitle className="flex items-center"><Search className="w-6 h-6 mr-2"/> Find Your Trip</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Select value={searchFilters.destinationId} onValueChange={(value) => setSearchFilters(f => ({ ...f, destinationId: value }))}><SelectTrigger disabled={loading.options}><SelectValue placeholder="Destination" /></SelectTrigger><SelectContent>{destinations.map((dest) => <SelectItem key={dest._id} value={dest._id}>{dest.title}</SelectItem>)}</SelectContent></Select>
                {/* Neighborhood filter as text input */}
                <Input placeholder="Pickup Area" value={searchFilters.neighborhood} onChange={e => setSearchFilters(f => ({ ...f, neighborhood: e.target.value }))} />
                <Input type="date" value={searchFilters.tripDate} onChange={(e) => setSearchFilters(f => ({ ...f, tripDate: e.target.value }))} min={new Date().toISOString().split("T")[0]} />
                <Select value={searchFilters.passengers.toString()} onValueChange={(value) => setSearchFilters(f => ({ ...f, passengers: parseInt(value)}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[1, 2, 3, 4, 5].map((num) => <SelectItem key={num} value={num.toString()}>{num} Passenger{num > 1 ? "s" : ""}</SelectItem>)}</SelectContent></Select>
                <Button onClick={handleSearch} disabled={loading.trips} className="w-full">Search Trips</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {error && <p className="text-center text-red-500 p-8">{error}</p>}
            {getFilteredTrips().map((trip) => (
              <Card key={trip._id} className="bus-card border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline">{trip.busNumber || 'BUS-00X'}</Badge>
                        <div className="flex items-center space-x-1">{renderStars(trip.driverId.rating)}<span>({trip.driverId.rating?.toFixed(1) || 'New'})</span></div>
                      </div>
                      <h3 className="font-bold text-lg">{trip.neighborhood} → {trip.destinationId.title}</h3>
                      <p className="text-gray-600 mb-2">Driver: {trip.driverId.name}</p>
                    </div>
                    <div className="lg:text-right space-y-3">
                      <div>
                        <span className="text-3xl font-bold">{trip.tripPrice} SAR</span>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                      <Button onClick={() => handleSelectTrip(trip)} className="w-full lg:w-auto px-8"><ArrowRight className="w-4 h-4 ml-2" />Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {getFilteredTrips().length === 0 && !loading.options && <div className="text-center py-10 text-gray-500">No trips found. Try adjusting your filters.</div>}
          </div>
        </>
      )}

      {/* PAYMENT STEP */}
      {currentStep === "payment" && selectedTrip && (
        <div className="max-w-4xl mx-auto">
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle>Complete Payment</CardTitle>
              <CardDescription>Review your trip details and confirm your booking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm">
                    <p><strong>Route:</strong> {selectedTrip.neighborhood} → {selectedTrip.destinationId.title}</p>
                    <p><strong>Passengers:</strong> {searchFilters.passengers}</p>
                    <p className="font-bold text-base mt-2">Total Amount: {selectedTrip.tripPrice * searchFilters.passengers} SAR</p>
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold block mb-2">Select Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Credit Card", "Mada", "Apple Pay"].map((method) => (
                    <div key={method} onClick={() => setPaymentMethod(method)} className={`p-4 rounded-lg border-2 cursor-pointer ${paymentMethod === method ? 'border-blue-500 ring-2 ring-blue-500' : 'hover:border-gray-300'}`}>
                      <h4 className="font-semibold flex items-center"><CreditCard className="mr-2 w-5 h-5"/>{method}</h4>
                    </div>
                  ))}
                </div>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setCurrentStep("search")}>Back to Trips</Button>
                <Button onClick={handlePayment} disabled={!paymentMethod || loading.payment}>
                  {loading.payment ? "Processing..." : "Complete Payment"} <CheckCircle className="w-4 h-4 ml-2"/>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NewBooking;