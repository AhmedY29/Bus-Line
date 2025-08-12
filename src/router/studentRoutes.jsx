// src/routes/studentRoutes.jsx

import Dashboard from "@/page/studentPages/StudentDashboard";
import BookingHistory from "@/page/studentPages/booking/BookingHistory";
import NewBooking from "@/page/studentPages/booking/NewBooking";
import StudentProfile from "@/page/studentPages/profile/StudentProfile";
import StudentSettings from "@/page/studentPages/settings/StudentSettings";
import StudentNotifications from "@/page/studentPages/notifications/StudentNotifications";
import LiveTracking from "@/page/studentPages/tracking/LiveTracking";
import RateTrip from "@/page/studentPages/tracking/RateTrip";
import StudentConversations from "@/page/studentPages/conversations/StudentConversations";
import SupportPage from "@/page/studentPages/support/SupportPage";
import DriverProfile from "@/page/studentPages/driverDetails/DriverDetails";

const studentRoutes = [
  { index: true, element: <Dashboard /> },
  { path: "bookings", element: <BookingHistory /> },
  { path: "new-booking", element: <NewBooking /> },
  { path: "rate-trip", element: <RateTrip /> },
  { path: "tracking", element: <LiveTracking /> },
  { path: "profile", element: <StudentProfile /> },
  { path: "settings", element: <StudentSettings /> },
  { path: "notifications", element: <StudentNotifications /> },
  { path: "chat", element: <StudentConversations /> },
  { path: "support", element: <SupportPage /> },
  { path: "driver/:driverId", element: <DriverProfile /> },
];

export default studentRoutes;
