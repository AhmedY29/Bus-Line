import { useState, useEffect, useMemo } from "react";
import { Bell, Check, X, Clock, Bus, CreditCard, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  studentGetNotifications,
  studentMarkNotificationAsRead,
  studentMarkAllNotificationsAsRead,
  studentDeleteNotification
} from "@/utils/student"; // API functions

// A helper to map notification types from the backend to a specific icon component
const getIconForType = (type) => {
  switch (type) {
    case "trip": return Bus;
    case "payment": return CreditCard;
    case "reminder": return Clock;
    case "booking": return Check;
    case "rating": return Star;
    default: return Bell;
  }
};

const NotificationCard = ({ notification, onMarkAsRead, onDelete }) => {
  const IconComponent = getIconForType(notification.type);

     // A helper to show relative time
  const formatTimeAgo = (dateString) => {
    // In a real app, use a library like `date-fns` or `moment`.
    // This is a simplified version.
    return `${new Date(dateString).toLocaleDateString()}`;
  };

  return (
    <Card className={`transition-all duration-200 ${!notification.read ? "bg-blue-50/30 border-l-4 border-l-blue-500" : "bg-white"}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
            <p className="text-sm text-gray-600 my-1">{notification.message}</p>
            <p className="text-xs text-gray-400">{formatTimeAgo(notification.createdAt)}</p>
          </div>
          <div className="flex items-center space-x-1">
            {!notification.read && (
              <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification._id)}>
                <Check className="w-4 h-4 text-blue-600" />
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onDelete(notification._id)}>
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await studentGetNotifications();
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  //  Memoize computed values to improve performance
  const { unreadCount, tripNotifications, paymentNotifications, reminderNotifications } = useMemo(() => {
    return {
      unreadCount: notifications.filter(n => !n.read).length,
      tripNotifications: notifications.filter(n => n.type === "trip"),
      paymentNotifications: notifications.filter(n => n.type === "payment"),
      reminderNotifications: notifications.filter(n => ["reminder", "booking", "rating"].includes(n.type)),
    };
  }, [notifications]);
  
  // --- API Action Handlers ---

  const markAsRead = async (id) => {
    // Optimistic UI update for instant feedback
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    try {
      await studentMarkNotificationAsRead(id);
    } catch (err) {
      setError("Failed to update notification. Please try again.");
      // Optional: Revert UI change on error
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: false } : n));
    }
  };
  
  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await studentMarkAllNotificationsAsRead();
    } catch (err) {
      setError("Failed to update notifications.");
    }
  };
  
  const deleteNotification = async (id) => {
    const originalNotifications = notifications;
    setNotifications(prev => prev.filter(n => n._id !== id));
    try {
      await studentDeleteNotification(id);
    } catch (err) {
      setError("Failed to delete notification.");
      setNotifications(originalNotifications); // Revert on error
    }
  };

  const renderTabContent = (notifList) => {
    if (loading) return <p className="text-center p-8">Loading...</p>;
    if (notifList.length === 0) return <p className="text-center p-8 text-gray-500">No notifications here.</p>;
    
    return notifList.map(notification => (
      <NotificationCard
        key={notification._id}
        notification={notification}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotification}
      />
    ));
  };

  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600">Stay updated with your trips and bookings</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">Mark All as Read ({unreadCount})</Button>
        )}
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="trips">Trips ({tripNotifications.length})</TabsTrigger>
          <TabsTrigger value="payments">Payments ({paymentNotifications.length})</TabsTrigger>
          <TabsTrigger value="reminders">Reminders ({reminderNotifications.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-3">{renderTabContent(notifications)}</TabsContent>
        <TabsContent value="trips" className="space-y-3">{renderTabContent(tripNotifications)}</TabsContent>
        <TabsContent value="payments" className="space-y-3">{renderTabContent(paymentNotifications)}</TabsContent>
        <TabsContent value="reminders" className="space-y-3">{renderTabContent(reminderNotifications)}</TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentNotifications;