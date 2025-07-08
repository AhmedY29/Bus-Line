import { useEffect, useState } from "react";
import { Star, Send, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

const RateTrip = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trip, setTrip] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest completed trip
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);

      if (!token || !userData) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "https://bus-line-backend.onrender.com/api/bookings/booking-student",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        console.log(data);
        const latestBooking = data.bookings?.[0];

        if (
          !latestBooking ||
          !latestBooking.tripId ||
          !latestBooking.tripId.driverId
        ) {
          alert("No completed trip found.");
          return;
        }

        setTrip({
          bookingId: latestBooking._id,
          tripId: latestBooking.tripId._id,
          driverId: latestBooking.tripId.driverId._id,
          driverName: latestBooking.tripId.driverId.name,
          busNumber: "N/A",
          departureTime: latestBooking.tripId.departureTime,
          arrivalTime: latestBooking.tripId.arrivalTime,
          date: latestBooking.createdAt?.split("T")[0],
          route:
            `${latestBooking.tripId.neighborhood} ➡️ ${latestBooking.tripId.destinationId.title}` ||
            "N/A",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip:", error);
        alert("Error loading trip data.");
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmitRating = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user || !trip) return;

    try {
      const response = await fetch(
        "https://bus-line-backend.onrender.com/api/rating/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            driverId: trip.driverId,
            userId: user._id,
            rating,
            comment,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit rating");

      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/student/bookings");
      }, 2000);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading trip details...</p>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bus-card border-0 text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-4">
              Your rating has been submitted successfully
            </p>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to booking history...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/student/bookings")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Trip</h1>
          <p className="text-gray-600">Help us improve our service</p>
        </div>
      </div>

      <div className="p-4">
        {/* Trip Details */}
        <Card className="bus-card border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trip ID:</span>
                  <Badge variant="outline">{trip.tripId}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-semibold">{trip.busNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver:</span>
                  <span className="font-semibold">{trip.driverName}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{trip.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">
                    {trip.departureTime} - {trip.arrivalTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-semibold">{trip.route}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <Card className="bus-card border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                How was your trip?
              </h3>
              <p className="text-gray-600">Rate your overall experience</p>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center mb-8">
              {rating > 0 && (
                <p className="text-lg font-semibold text-gray-700">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                Tell us more about your experience (Optional)
              </label>
              <Textarea
                placeholder="Share your feedback about the driver, bus condition, punctuality, or any other aspects of your trip..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmitRating}
                disabled={rating === 0}
                className="gradient-button px-8 py-3 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Rating
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RateTrip;
