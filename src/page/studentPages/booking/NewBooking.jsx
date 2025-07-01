
import { useState } from "react";
import { MapPin, Calendar, Clock, Users, ArrowRight, Search, Star, Filter, CreditCard, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PaymentSuccess from "./PaymentSuccess";

const NewBooking = () => {
  const [currentStep, setCurrentStep] = useState("search"); // search, payment, success
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    neighborhood: "",
    date: "",
    time: "",
    passengers: 1,
    searchQuery: ""
  });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock available trips data
  const availableTrips = [
    {
      id: "TRIP-001",
      destination: "Cairo University",
      neighborhood: "Maadi",
      driverName: "Ahmed Mahmoud",
      rating: 4.8,
      price: 25,
      departureTime: "07:30 AM",
      arrivalTime: "08:45 AM",
      date: "2024-01-20",
      capacity: 45,
      bookedSeats: 32,
      features: ["AC", "WiFi", "USB Charging"],
      busNumber: "BUS-001"
    },
    {
      id: "TRIP-002",
      destination: "New Administrative Capital",
      neighborhood: "New Cairo",
      driverName: "Omar Ali",
      rating: 4.6,
      price: 30,
      departureTime: "08:00 AM",
      arrivalTime: "09:15 AM",
      date: "2024-01-20",
      capacity: 50,
      bookedSeats: 28,
      features: ["AC", "WiFi", "Entertainment"],
      busNumber: "BUS-002"
    },
    {
      id: "TRIP-003",
      destination: "Downtown Cairo",
      neighborhood: "Maadi",
      driverName: "Mohamed Hassan",
      rating: 4.9,
      price: 20,
      departureTime: "08:30 AM",
      arrivalTime: "09:45 AM",
      date: "2024-01-20",
      capacity: 40,
      bookedSeats: 15,
      features: ["AC", "WiFi", "USB Charging", "Snacks"],
      busNumber: "BUS-003"
    }
  ];

  const destinations = ["Cairo University", "New Administrative Capital", "Downtown Cairo", "Smart Village"];
  const neighborhoods = ["Maadi", "New Cairo", "Heliopolis", "Dokki", "Zamalek"];

  // Filter trips based on search criteria
  const filteredTrips = availableTrips.filter(trip => {
    const matchesDestination = !searchFilters.destination || trip.destination === searchFilters.destination;
    const matchesNeighborhood = !searchFilters.neighborhood || trip.neighborhood === searchFilters.neighborhood;
    const matchesSearch = !searchFilters.searchQuery || 
      trip.destination.toLowerCase().includes(searchFilters.searchQuery.toLowerCase()) ||
      trip.neighborhood.toLowerCase().includes(searchFilters.searchQuery.toLowerCase());
    
    return matchesDestination && matchesNeighborhood && matchesSearch;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleBookTrip = (trip) => {
    setSelectedTrip(trip);
    setCurrentStep("payment");
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep("success");
      setShowSuccess(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCurrentStep("search");
    setSelectedTrip(null);
    setPaymentMethod("");
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case "search": return 33;
      case "payment": return 66;
      case "success": return 100;
      default: return 0;
    }
  };

  if (showSuccess && selectedTrip) {
    return (
      <PaymentSuccess
        bookingId="BK001"
        amount={selectedTrip.price * searchFilters.passengers}
        route={`${selectedTrip.neighborhood} → ${selectedTrip.destination}`}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <div className="p-2 space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Search & Book</span>
          <span>Complete Booking</span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
      </div>

      {/* Search & Filter Section */}
      {currentStep === "search" && (
        <>
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-600" />
                Find Your Trip
              </CardTitle>
              <CardDescription>Search and filter available trips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destinations or neighborhoods..."
                  value={searchFilters.searchQuery}
                  onChange={(e) => setSearchFilters({...searchFilters, searchQuery: e.target.value})}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={searchFilters.destination} onValueChange={(value) => setSearchFilters({...searchFilters, destination: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-destinations">All Destinations</SelectItem>
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={searchFilters.neighborhood} onValueChange={(value) => setSearchFilters({...searchFilters, neighborhood: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pickup Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-areas">All Areas</SelectItem>
                    {neighborhoods.map((area) => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => setSearchFilters({...searchFilters, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />

                <Select value={searchFilters.passengers.toString()} onValueChange={(value) => setSearchFilters({...searchFilters, passengers: parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Passenger{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Available Trips */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Available Trips</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {filteredTrips.length} trips found
              </Badge>
            </div>

            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="bus-card border-0 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Trip Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          {trip.busNumber}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {renderStars(trip.rating)}
                          <span className="text-sm text-gray-600 ml-1">({trip.rating})</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {trip.neighborhood} → {trip.destination}
                          </h3>
                          <p className="text-gray-600 mb-2">Driver: {trip.driverName}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {trip.departureTime} - {trip.arrivalTime}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {trip.date}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Users className="w-4 h-4" />
                            <span>{trip.capacity - trip.bookedSeats} seats available</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {trip.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Book Button */}
                    <div className="lg:text-right space-y-3">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">{trip.price} EGP</span>
                        <p className="text-sm text-gray-600">per person</p>
                        {searchFilters.passengers > 1 && (
                          <p className="text-lg font-semibold text-blue-600">
                            Total: {trip.price * searchFilters.passengers} EGP
                          </p>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleBookTrip(trip)}
                        className="gradient-button w-full lg:w-auto px-8"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Payment Section */}
      {currentStep === "payment" && selectedTrip && (
        <div className="max-w-4xl mx-auto">
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                Complete Payment
              </CardTitle>
              <CardDescription>Review your booking and complete payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Trip Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-semibold">{selectedTrip.neighborhood} → {selectedTrip.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-semibold">{selectedTrip.date} at {selectedTrip.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bus:</span>
                      <span className="font-semibold">{selectedTrip.busNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Driver:</span>
                      <span className="font-semibold">{selectedTrip.driverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-semibold">{searchFilters.passengers}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per person:</span>
                      <span className="font-semibold">{selectedTrip.price} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-semibold">{searchFilters.passengers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">{selectedTrip.price * searchFilters.passengers} EGP</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-green-600">{selectedTrip.price * searchFilters.passengers} EGP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods */}
              <div>
                <Label className="text-lg font-semibold mb-4 block">Select Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Credit Card", "Vodafone Cash", "Mobile Wallet"].map((method) => (
                    <Card 
                      key={method}
                      className={`cursor-pointer transition-all duration-200 ${
                        paymentMethod === method 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold">{method}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep("search")}
                  className="min-w-32"
                >
                  Back to Trips
                </Button>
                
                <Button 
                  onClick={handlePayment}
                  disabled={!paymentMethod}
                  className="gradient-button min-w-32"
                >
                  Complete Payment
                  <CheckCircle className="w-4 h-4 ml-2" />
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