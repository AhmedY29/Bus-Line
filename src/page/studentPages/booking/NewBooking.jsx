import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
import PaymentSuccess from "./PaymentSuccess"; 

//  Import all necessary API functions
import {
    studentGetAvailableTrips,
    studentGetDestinations,
    studentGetNeighborhoods,
    studentCreateBooking,
    studentProcessPayment
} from '@/utils/student';

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
  const [neighborhoods, setNeighborhoods] = useState([]);

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

  // ---------- Data Fetching ----------

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(prev => ({ ...prev, options: true }));
        const [destRes, neighRes] = await Promise.all([
            studentGetDestinations(),
            studentGetNeighborhoods()
        ]);
        setDestinations(destRes.data);
        setNeighborhoods(neighRes.data);
      } catch (err) {
        setError("Could not load search options.");
        console.error(err);
      } finally {
        setLoading(prev => ({ ...prev, options: false }));
      }
    };
    fetchOptions();
  }, []);

  const handleSearch = async () => {
    try {
        setLoading(prev => ({ ...prev, trips: true }));
        setError("");
        const response = await studentGetAvailableTrips(searchFilters);
        setAvailableTrips(response.data);
    } catch (err) {
        setError("Failed to find trips. Please adjust your filters and try again.");
        console.error(err);
    } finally {
        setLoading(prev => ({ ...prev, trips: false }));
    }
  };

  // --- Event Handlers ---

  // Step 1: User selects a trip, moving them to the payment/review screen.
  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setCurrentStep("payment");
  };

  //  Step 2: User confirms payment, triggering backend calls.
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
        const bookingRes = await studentCreateBooking(bookingPayload);
        const newBooking = bookingRes.data;

        // 2. Process the payment for the new booking
        const paymentPayload = {
            bookingId: newBooking._id,
            amount: selectedTrip.tripPrice * searchFilters.passengers,
            method: paymentMethod,
        };
        await studentProcessPayment(paymentPayload);

        // 3. Store confirmed booking and move to success step
        setConfirmedBooking(newBooking);
        setCurrentStep("success");

    } catch (err) {
        setError("Booking failed. Please try again.");
        console.error(err);
    } finally {
        setLoading(prev => ({ ...prev, payment: false }));
    }
  };

  const handleSuccessClose = () => {
    // Reset state to allow for a new booking
    setCurrentStep("search");
    setSelectedTrip(null);
    setPaymentMethod("");
    setAvailableTrips([]);
    setConfirmedBooking(null);
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
                <Select value={searchFilters.neighborhood} onValueChange={(value) => setSearchFilters(f => ({ ...f, neighborhood: value }))}><SelectTrigger disabled={loading.options}><SelectValue placeholder="Pickup Area" /></SelectTrigger><SelectContent>{neighborhoods.map((area) => <SelectItem key={area} value={area}>{area}</SelectItem>)}</SelectContent></Select>
                <Input type="date" value={searchFilters.tripDate} onChange={(e) => setSearchFilters(f => ({ ...f, tripDate: e.target.value }))} min={new Date().toISOString().split("T")[0]} />
                <Select value={searchFilters.passengers.toString()} onValueChange={(value) => setSearchFilters(f => ({ ...f, passengers: parseInt(value)}))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{[1, 2, 3, 4, 5].map((num) => <SelectItem key={num} value={num.toString()}>{num} Passenger{num > 1 ? "s" : ""}</SelectItem>)}</SelectContent></Select>
                <Button onClick={handleSearch} disabled={loading.trips} className="w-full">{loading.trips ? 'Searching...' : 'Search Trips'}</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {loading.trips && <p className="text-center animate-pulse p-8">Finding available trips...</p>}
            {error && !loading.trips && <p className="text-center text-red-500 p-8">{error}</p>}
            {!loading.trips && availableTrips.map((trip) => (
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