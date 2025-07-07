import api from "./api"; 

//  New Booking Page Functions 

/**
 * Fetches available trips based on the provided filters.
 * @param {object} filters - The search and filter criteria.
 * @returns {Promise<object>}
 */
export const studentGetAvailableTrips = (filters) => {
  return api.get("/student/trips", { params: filters });
};

/**
 * Fetches the list of available destinations.
 * @returns {Promise<object>}
 */
export const studentGetDestinations = () => {
  return api.get("/student/destinations");
};

/**
 * Fetches the list of available neighborhoods.
 * @returns {Promise<object>}
 */
export const studentGetNeighborhoods = () => {
  return api.get("/student/neighborhoods");
};

/**
 * Creates a new booking.
 * @param {object} bookingData - The data for the new booking.
 * @returns {Promise<object>}
 */
export const studentCreateBooking = (bookingData) => {
  return api.post("/student/bookings", bookingData);
};

export const studentGetBookingDetails = (bookingId) => {
  return api.get(`/student/bookings/${bookingId}`);
};
/**
 * Processes the payment for a booking.
 * @param {object} paymentDetails - The payment details.
 * @returns {Promise<object>}
 */
export const studentProcessPayment = (paymentDetails) => {
  return api.post("/student/payment", paymentDetails);
};



//  Booking History & Rating Page Functions 

/**
 * Fetches the booking history for the student.
 * @param {object} filters - The filters for status and search query.
 * @returns {Promise<object>}
 */
export const studentGetBookingHistory = (filters) => {
  return api.get("/student/bookings", { params: filters });
};

/**
 * Cancels a booking.
 * @param {string} bookingId - The ID of the booking to cancel.
 * @returns {Promise<object>}
 */
export const studentCancelBooking = (bookingId) => {
  return api.put(`/student/bookings/${bookingId}/cancel`);
};

/**
 * Submits a rating for a completed trip.
 * @param {string} bookingId - The ID of the booking to rate.
 * @param {object} ratingData - The rating data (e.g., rating, comment).
 * @returns {Promise<object>}
 */
export const studentRateTrip = (bookingId, ratingData) => {
  return api.post(`/student/bookings/${bookingId}/rate`, ratingData);
};



//  Conversations Page Functions 

/**
 * Fetches the student's conversations with drivers.
 * @returns {Promise<object>}
 */
export const studentGetConversations = () => {
  return api.get("/student/conversations");
};

/**
 * Fetches the messages for a specific conversation.
 * @param {string} conversationId - The ID of the conversation.
 * @returns {Promise<object>}
 */
export const studentGetMessages = (conversationId) => {
  return api.get(`/student/conversations/${conversationId}/messages`);
};

/**
 * Sends a message in a conversation.
 * @param {string} conversationId - The ID of the conversation.
 * @param {object} messageData - The message data to be sent.
 * @returns {Promise<object>}
 */
export const studentSendMessage = (conversationId, messageData) => {
  return api.post(`/student/conversations/${conversationId}/messages`, messageData);
};



//  Notifications Page Functions 

/**
 * Fetches the student's notifications.
 * @returns {Promise<object>}
 */
export const studentGetNotifications = () => {
  return api.get("/student/notifications");
};

/**
 * Marks a single notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 * @returns {Promise<object>}
 */
export const studentMarkNotificationAsRead = (notificationId) => {
  return api.put(`/student/notifications/${notificationId}/read`);
};

/**
 * Marks all notifications as read.
 * @returns {Promise<object>}
 */
export const studentMarkAllNotificationsAsRead = () => {
  return api.put("/student/notifications/read-all");
};

/**
 * Deletes a notification.
 * @param {string} notificationId - The ID of the notification to delete.
 * @returns {Promise<object>}
 */
export const studentDeleteNotification = (notificationId) => {
  return api.delete(`/student/notifications/${notificationId}`);
};



//  Profile Page Functions 

/**
 * Fetches the student's profile data.
 * @returns {Promise<object>}
 */
export const studentGetProfile = () => {
  return api.get("/student/profile");
};

/**
 * Updates the student's profile data.
 * @param {object} profileData - The updated profile data.
 * @returns {Promise<object>}
 */
export const studentUpdateProfile = (profileData) => {
  return api.put("/student/profile", profileData);
};



//  Settings Page Functions 

/**
 * Fetches the student's settings.
 * @returns {Promise<object>}
 */
export const studentGetSettings = () => {
  return api.get("/student/settings");
};

/**
 * Updates the student's settings.
 * @param {object} settingsData - The updated settings data.
 * @returns {Promise<object>}
 */
export const studentUpdateSettings = (settingsData) => {
  return api.put("/student/settings", settingsData);
};



//  Live Tracking Page Functions 

/**
 * Fetches the details of the student's active trip.
 * @returns {Promise<object>}
 */
export const studentGetActiveTrip = () => {
  return api.get("/student/active-trip");
};

/**
 * Fetches real-time updates for a specific trip.
 * @param {string} tripId - The ID of the trip to get updates for.
 * @returns {Promise<object>}
 */
export const studentGetTripUpdates = (tripId) => {
  return api.get(`/student/trips/${tripId}/updates`);
};



//  Dashboard Page Function 

/**
 * Fetches all necessary data for the student dashboard in a single call.
 * This includes stats, upcoming trips, and recent activity.
 * @returns {Promise<object>}
 */
export const studentGetDashboardData = () => {
  return api.get("/student/dashboard");
};