import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Star, Send, ArrowLeft, CheckCircle, Calendar, MapPin, X as CloseIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { studentGetBookingHistory, studentRateTrip } from "@/utils/student";

/**
 * A Modal for submitting a trip rating.
 * It manages its own form state and submission logic.
 */
const RatingModal = ({ isOpen, onClose, booking, onRatingSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset form when a new booking is passed in
    setRating(0);
    setComment("");
    setError("");
  }, [booking]);

  if (!booking) return null;

  const trip = booking.tripId;

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    setError("");
    try {
      const payload = { rating, comment, driverId: trip.driverId._id };
      await studentRateTrip(booking._id, payload);
      onRatingSuccess(booking._id); // Notify parent on success
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (r) => ({ 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent!" }[r] || "How was your experience?");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Rate Your Trip</DialogTitle>
          <DialogDescription>Your feedback for the trip to {trip.destinationId.title} on {new Date(trip.tripDateStart).toLocaleDateString()}.</DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-gray-600 h-6 font-medium mb-4">{getRatingLabel(hoverRating || rating)}</p>
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)}>
                <Star className={`w-10 h-10 transition-all duration-150 ease-in-out hover:scale-110 ${star <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              </button>
            ))}
          </div>
          <Textarea placeholder="Add an optional comment..." value={comment} onChange={(e) => setComment(e.target.value)} className="mt-6 min-h-28" />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
          <Button onClick={handleSubmit} disabled={rating === 0 || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


/**
 * The main page component that displays a list of trips to be rated.
 */
const RateTripPage = () => {
  const navigate = useNavigate();
  const [unratedTrips, setUnratedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripToRate, setTripToRate] = useState(null);

  useEffect(() => {
    const fetchTripsToRate = async () => {
      try {
        const response = await studentGetBookingHistory({ status: 'completed' });
        const tripsToRate = response.data.filter(booking => !booking.rating);
        setUnratedTrips(tripsToRate);
      } catch (err) {
        setError("Could not load your trip history.");
      } finally {
        setLoading(false);
      }
    };
    fetchTripsToRate();
  }, []);

  const handleOpenModal = (booking) => {
    setTripToRate(booking);
    setIsModalOpen(true);
  };

  const handleRatingSuccess = (ratedBookingId) => {
    setUnratedTrips(prev => prev.filter(booking => booking._id !== ratedBookingId));
    setIsModalOpen(false);
    // Optional: Show a success toast notification here
  };

  if (loading) return <div className="p-8 text-center">Loading trips to rate...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-6 ">
      {/* Header */}
      <div className="flex justify-center space-x-4 flex-col">
        <div className="
        ">
          <Button variant="outline" size="sm" onClick={() => navigate('/student/bookings')}><ArrowLeft className="w-4 h-4 mr-2" />Back to History</Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Pending Ratings</h1>
          <p className="text-gray-600">Rate your past trips to help us improve.</p>
        </div>
      </div>

      {/* List of Trips to Rate */}
      <div className="space-y-4">
        {unratedTrips.length > 0 ? (
          unratedTrips.map(booking => (
            <Card key={booking._id} className="bus-card border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg"><Calendar className="w-6 h-6 text-gray-600" /></div>
                  <div>
                    <p className="font-bold">{booking.tripId.neighborhood} → {booking.tripId.destinationId.title}</p>
                    <p className="text-sm text-gray-500">On {new Date(booking.tripId.tripDateStart).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button onClick={() => handleOpenModal(booking)}>
                  <Star className="w-4 h-4 mr-2" /> Rate Trip
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">You're All Caught Up!</h2>
            <p className="text-gray-600 mt-2">You have rated all of your completed trips.</p>
          </div>
        )}
      </div>

      {/* The Rating Modal */}
      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={tripToRate}
        onRatingSuccess={handleRatingSuccess}
      />
    </div>
  );
};

export default RateTripPage;