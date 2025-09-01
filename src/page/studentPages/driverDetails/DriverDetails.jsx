import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  Calendar,
  Mail,
  MapPin,
  Car,
  Star,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [trips, setTrips] = useState(null);
  const [selectedSection, setSelectedSection] = useState("reviews"); // Default section is "reviews"
  const { driverId } = useParams();
  const navigate = useNavigate();
  console.log(driverId, "s");
  // Mock API request to simulate fetching data
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const rating = await axios.get(
          `https://bus-line-backend.onrender.com/api/rating/driver/${driverId}`
        );
        const trips = await axios.get(
          `https://bus-line-backend.onrender.com/api/trips/driver/${driverId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(rating, "ratings");
        console.log(trips, "trips");

        setRatings(rating.data.ratings);
        setDriver(
          rating.data.ratings[0]?.driverId || trips.data.trips[0]?.driverId
        );
        console.log(driver, "d");
        setTrips(trips.data.trips);
      } catch (error) {
        toast.error("Error In Get Driver Details");
        console.log(
          `Error In Get Driver Details: ${error.response.data.message}`
        );
      }
    };

    fetchDriverData();
  }, []);

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

  if (!driver) {
    return (
      <div className="p-6">
        <Button variant="icon" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <div className="flex items-start gap-6 flex-row md:items-center ">
          <div className="relative">
            <Skeleton className={"w-24 h-24 rounded-full"} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <Skeleton className={"w-15 h-5 rounded"} />
              <Skeleton className={"w-10 h-5 rounded"} />
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Skeleton className={"w-30 h-5 rounded"} />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className={"w-30 h-5 rounded"} />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className={"w-30 h-5 rounded"} />
              </div>
            </div>
          </div>
        </div>
        <div className="divider my-5">
          <hr />
        </div>
        <div className="flex w-full justify-center gap-4 mt-4">
          <Skeleton className={"w-25 h-8 rounded"} />

          <Skeleton className={"w-25 h-8 rounded"} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start gap-2">
                <Skeleton className={"w-8 h-8 rounded-full"} />

                <div className="flex-1">
                  <Skeleton className={"w-15 h-5 rounded"} />
                  <div className="flex items-center gap-1 my-2">
                    <Skeleton className={"w-40 h-5 rounded"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start gap-2">
                <Skeleton className={"w-8 h-8 rounded-full"} />

                <div className="flex-1">
                  <Skeleton className={"w-15 h-5 rounded"} />
                  <div className="flex items-center gap-1 my-2">
                    <Skeleton className={"w-40 h-5 rounded"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start gap-2">
                <Skeleton className={"w-8 h-8 rounded-full"} />

                <div className="flex-1">
                  <Skeleton className={"w-15 h-5 rounded"} />
                  <div className="flex items-center gap-1 my-2">
                    <Skeleton className={"w-40 h-5 rounded"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderReviews = () => (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Reviews</h2>
      <div className="flex flex-col space-y-2">
        {ratings?.map((rating) => (
          <div key={rating?._id} className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={rating.userId.avatar} alt="Reviewer" />
              <AvatarFallback className="text-2xl">
                {rating.userId.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{rating.userId.name}</p>
              <div className="flex items-center gap-1">
                {renderStars(rating.rating)}
                <span>({rating.rating.toFixed(1) || "New"})</span>
              </div>
              <p className="text-sm text-muted-foreground">{rating.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrips = () => (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Trips</h2>
      <div className="flex flex-col space-y-2">
        {trips.map((trip) => (
          <Card
            key={trip._id}
            className="border-0 hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div>
                  <div
                    title={`Driver Name: ${trip.driverId.name} `}
                    className="flex items-center gap-3 mb-3"
                  >
                    <Badge variant="outline">{trip.driverId.name}</Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(trip.driverId.rating)}
                      <span>({trip.driverId.rating?.toFixed(1) || "New"})</span>
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
                    {new Date(trip.tripDateStart).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <span className="text-2xl font-bold">
                      {trip.tripPrice} SAR
                    </span>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                  <Button onClick={() => navigate("/student/new-booking")}>
                    <ArrowRight className="w-4 h-4 ml-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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
      <CardContent className="p-6">
        <Button variant="icon" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <div className="flex items-start gap-6 flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {/* <AvatarImage
                src="https://bundui-images.netlify.app/avatars/08.png"
                alt="Profile"
              /> */}
              <AvatarFallback className="text-2xl">
                {driver.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{driver.name}</h1>
              <Badge variant="secondary">Driver</Badge>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {driver.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {driver.location || "Riyadh"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined{" "}
                {new Date(driver.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="divider my-5">
          <hr />
        </div>
        {/* NavBar to switch sections */}
        <div className="flex w-full justify-center gap-4 mt-4">
          <Button
            onClick={() => setSelectedSection("reviews")}
            variant={selectedSection === "reviews" ? "default" : "outline"}
          >
            Reviews ({ratings.length || 0})
          </Button>
          <Button
            onClick={() => setSelectedSection("Trips")}
            variant={selectedSection === "Trips" ? "default" : "outline"}
          >
            Trips ({trips.length || 0})
          </Button>
        </div>
        {/* Render selected section */}
        <div className="mt-6">
          {selectedSection === "reviews" ? renderReviews() : renderTrips()}
        </div>
      </CardContent>
    </>
  );
}
