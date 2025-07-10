import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  X,
  Filter,
  Clock,
  Bus,
  CreditCard,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "https://bus-line-backend.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const withTime = res.data.notifications.map((n) => ({
        ...n,
        time: new Date(n.createdAt).toLocaleString(),
        icon: getIcon(n.type),
      }));

      setNotifications(withTime);
    } catch (err) {
      setError(err.message);
      console.error("خطأ في جلب الإشعارات", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await axios.put(
      `https://bus-line-backend.onrender.com/api/notifications/mark/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "https://bus-line-backend.onrender.com/api/notifications/mark-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // تحديث جميع الإشعارات محليًا
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      setError(err.message);
      console.error("فشل في تحديث كل الإشعارات:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `https://bus-line-backend.onrender.com/api/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
      console.error("فشل في حذف الإشعار:", err);
    }
  };
  const getTypeColor = (type) => {
    switch (type) {
      case "trip":
        return "bg-blue-100 text-blue-600";
      case "payment":
        return "bg-green-100 text-green-600";
      case "reminder":
        return "bg-orange-100 text-orange-600";
      case "booking":
        return "bg-purple-100 text-purple-600";
      case "rating":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "trip":
        return "Trip Update";
      case "payment":
        return "Payment";
      case "reminder":
        return "Reminder";
      case "booking":
        return "Booking";
      case "rating":
        return "Rating";
      default:
        return "Notification";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "trip":
        return Bus;
      case "payment":
        return CreditCard;
      case "reminder":
        return Clock;
      case "rating":
        return Star;
      case "booking":
        return Check;
      default:
        return Bell;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const tripNotifications = notifications.filter((n) => n.type === "trip");
  const paymentNotifications = notifications.filter(
    (n) => n.type === "payment"
  );
  const reminderNotifications = notifications.filter(
    (n) => n.type === "reminder" || n.type === "booking"
  );

  const renderTabContent = (list) =>
    list.length > 0 ? (
      list.map((n) => (
        <NotificationCard
          key={n._id}
          notification={n}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
          getTypeColor={getTypeColor}
          getTypeLabel={getTypeLabel}
        />
      ))
    ) : (
      <p className="text-center text-gray-400">No notifications found.</p>
    );
  return (
    <div className="space-y-6 p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your trips and bookings
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="trips">
            Trips ({tripNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="payments">
            Payments ({paymentNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="reminders">
            Reminders ({reminderNotifications.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-3">
          {renderTabContent(notifications)}
        </TabsContent>
        <TabsContent value="trips" className="space-y-3">
          {renderTabContent(tripNotifications)}
        </TabsContent>
        <TabsContent value="payments" className="space-y-3">
          {renderTabContent(paymentNotifications)}
        </TabsContent>
        <TabsContent value="reminders" className="space-y-3">
          {renderTabContent(reminderNotifications)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NotificationCard = ({
  notification,
  onMarkAsRead,
  onDelete,
  getTypeColor,
  getTypeLabel,
}) => {
  const IconComponent = notification.icon;

  return (
    <Card
      className={`bus-card border-0 transition-all duration-200 ${
        !notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div
            className={`w-10 h-10 rounded-lg ${getTypeColor(
              notification.type
            )} flex items-center justify-center`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                {notification.title}
              </h3>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(notification.type)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            <p className="text-xs text-gray-400">{notification.time}</p>
          </div>

          <div className="flex items-center space-x-2">
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification._id)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(notification._id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentNotifications;
