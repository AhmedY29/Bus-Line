import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Search,
  Star,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PaymentSuccess from "./PaymentSuccess";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Helper: Get token from localStorage
const getToken = () => localStorage.getItem("token") || "";

// Fetch all destinations
const fetchDestinations = async () => {
  const res = await axios.get(
    "https://bus-line-backend.onrender.com/api/destination/"
  );
  return Array.isArray(res.data.destinations) ? res.data.destinations : [];
};

// Fetch all trips
const fetchTrips = async () => {
  const res = await axios.get(
    "https://bus-line-backend.onrender.com/api/trips"
  );
  return Array.isArray(res.data.trips) ? res.data.trips : [];
};

const NewBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("search");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState({
    options: true,
    trips: false,
    payment: false,
  });
  const [error, setError] = useState("");

  const [searchFilters, setSearchFilters] = useState({
    destinationId: "",
    neighborhood: "",
    tripDate: "",
    passengers: 1,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading((prev) => ({ ...prev, options: true }));
        const dests = await fetchDestinations();
        const trips = await fetchTrips();
        setDestinations(dests);
        setAvailableTrips(trips);
      } catch (err) {
        setError("Could not load data.");
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, options: false }));
      }
    };
    fetchOptions();
  }, []);

  const getFilteredTrips = () => {
    return availableTrips.filter((trip) => {
      if (
        searchFilters.destinationId !== "all" &&
        searchFilters.destinationId &&
        String(trip.destinationId?._id) !== String(searchFilters.destinationId)
      )
        return false;
      if (
        searchFilters.neighborhood &&
        !trip.neighborhood
          ?.toLowerCase()
          .includes(searchFilters.neighborhood.toLowerCase())
      )
        return false;
      if (
        searchFilters.tripDate &&
        trip.tripDateStart.slice(0, 10) !== searchFilters.tripDate
      )
        return false;
      return true;
    });
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setError("");
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setCurrentStep("payment");
  };

  const handlePayment = async () => {
    if (!paymentMethod || !selectedTrip) {
      setError("Please select a payment method.");
      return;
    }
    setLoading((prev) => ({ ...prev, payment: true }));
    setError("");

    try {
      const bookingPayload = {
        tripId: selectedTrip._id,
        subscriptionStart: "2025/04/10",
        subscriptionEnd: "2025/08/30",
      };

      const bookingRes = await axios.post(
        "https://bus-line-backend.onrender.com/api/bookings",
        bookingPayload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const newBooking =
        bookingRes.data.data || bookingRes.data.booking || bookingRes.data;
      setConfirmedBooking(newBooking);
      setCurrentStep("success");
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      setError("Booking failed. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, payment: false }));
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating ?? 0)
            ? "text-yellow-500 fill-current"
            : "text-gray-300"
        }`}
      />
    ));

  const getStepProgress = () =>
    ({ search: 33, payment: 66, success: 100 }[currentStep] || 0);

  const handleSuccessClose = () => window.location.reload();

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
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "bg-white",
            color: "text-neutral-900",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="p-2 space-y-6">
        <div className="mb-8">
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {currentStep === "search" && (
          <>
            <Card className="border-0">
              <CardHeader>
                <CardTitle className={"flex items-center gap-1"}>
                  <Search className="w-6 h-6 mr-2" />
                  Find Your Trip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select
                    value={searchFilters.destinationId}
                    onValueChange={(value) =>
                      setSearchFilters((f) => ({ ...f, destinationId: value }))
                    }
                  >
                    <SelectTrigger disabled={loading.options}>
                      <SelectValue placeholder="Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"all"}>All Destinations</SelectItem>
                      {destinations.map((dest) => (
                        <SelectItem key={dest._id} value={dest._id}>
                          {dest.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Pickup Area"
                    value={searchFilters.neighborhood}
                    onChange={(e) =>
                      setSearchFilters((f) => ({
                        ...f,
                        neighborhood: e.target.value,
                      }))
                    }
                  />
                  <Input
                    type="date"
                    value={searchFilters.tripDate}
                    onChange={(e) =>
                      setSearchFilters((f) => ({
                        ...f,
                        tripDate: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Select
                    value={searchFilters.passengers.toString()}
                    onValueChange={(value) =>
                      setSearchFilters((f) => ({
                        ...f,
                        passengers: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} Passenger{num > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="w-full">
                    Search Trips
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {getFilteredTrips().map((trip) => (
                <Card
                  key={trip._id}
                  className="border-0 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div>
                        <div
                          onClick={() =>
                            navigate(`/student/driver/${trip.driverId?._id}`)
                          }
                          title={`Driver Name: ${trip.driverId.name} `}
                          className="flex items-center gap-3 mb-3"
                        >
                          <Badge
                            className={"hover:underline cursor-pointer"}
                            variant="outline"
                          >
                            {trip.driverId.name}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(trip.driverId.rating)}
                            <span>
                              ({trip.driverId.rating?.toFixed(1) || "New"})
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg">
                          {trip.neighborhood} → {trip.destinationId?.title}
                        </h3>
                        <p className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <h1>
                            {trip.arrivalTime}, {trip.departureTime}
                          </h1>
                        </p>
                        <p className="flex items-center gap-1 text-gray-600">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(trip.tripDateStart).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <span className="text-2xl font-bold">
                            {trip.tripPrice} SAR
                          </span>
                          <p className="text-sm text-gray-600">per person</p>
                        </div>
                        <Button
                          onClick={() =>
                            user.address?.coordinate?.lat
                              ? handleSelectTrip(trip)
                              : (toast.error("Add Your Address"),
                                navigate("/student/profile"))
                          }
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {getFilteredTrips().length === 0 && !loading.options && (
                <div className="text-center text-gray-500 py-10">
                  No trips found.
                </div>
              )}
            </div>
          </>
        )}

        {currentStep === "payment" && selectedTrip && (
          <div className="max-w-4xl mx-auto">
            <Card className="border-0">
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Review your trip details and confirm your booking.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Booking Summary</h3>
                  <p>
                    <strong>Route:</strong> {selectedTrip.neighborhood} →{" "}
                    {selectedTrip.destinationId?.title}
                  </p>
                  <p>
                    <strong>Arrival Time:</strong> {selectedTrip.arrivalTime}
                  </p>
                  <p>
                    <strong>Departure Time:</strong>{" "}
                    {selectedTrip.departureTime}
                  </p>
                  <p>
                    <strong>Start At:</strong>{" "}
                    {new Date(selectedTrip.tripDateStart).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    <strong>Passengers:</strong> {searchFilters.passengers}
                  </p>
                  <p className="font-bold text-base mt-2">
                    Total Amount:{" "}
                    {selectedTrip.tripPrice * searchFilters.passengers} SAR
                  </p>
                </div>
                <div>
                  <Label className="text-lg font-semibold mb-2 block">
                    Select Payment Method
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Credit Card", "Mada", "Apple Pay"].map((method) => (
                      <div
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          paymentMethod === method
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : "hover:border-gray-300"
                        }`}
                      >
                        <h4 className="font-semibold flex items-center">
                          <CreditCard className="mr-2 w-5 h-5" />
                          {method}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("search")}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={!paymentMethod || loading.payment}
                  >
                    {loading.payment ? "Processing..." : "Complete Payment"}{" "}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default NewBooking;
