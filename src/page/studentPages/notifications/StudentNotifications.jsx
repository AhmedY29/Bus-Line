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
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     title: "Bus Approaching",
  //     message: "Your bus BUS-001 will arrive at your pickup point in 5 minutes",
  //     type: "trip",
  //     time: "2 minutes ago",
  //     read: false,
  //     icon: Bus,
  //   },
  //   {
  //     id: 2,
  //     title: "Payment Successful",
  //     message:
  //       "Your payment of 30 SAR for trip to Cairo University has been processed",
  //     type: "payment",
  //     time: "1 hour ago",
  //     read: false,
  //     icon: CreditCard,
  //   },
  //   {
  //     id: 3,
  //     title: "Trip Reminder",
  //     message:
  //       "Don't forget your trip to New Administrative Capital tomorrow at 9:00 AM",
  //     type: "reminder",
  //     time: "3 hours ago",
  //     read: true,
  //     icon: Clock,
  //   },
  //   {
  //     id: 4,
  //     title: "Rate Your Trip",
  //     message:
  //       "How was your trip with Ahmed Mahmoud? Please rate your experience",
  //     type: "rating",
  //     time: "1 day ago",
  //     read: true,
  //     icon: Star,
  //   },
  //   {
  //     id: 5,
  //     title: "Trip Delayed",
  //     message:
  //       "Your bus BUS-003 is running 10 minutes late due to traffic conditions",
  //     type: "trip",
  //     time: "2 days ago",
  //     read: true,
  //     icon: Bus,
  //   },
  //   {
  //     id: 6,
  //     title: "Booking Confirmed",
  //     message: "Your booking for trip to Downtown Cairo has been confirmed",
  //     type: "booking",
  //     time: "3 days ago",
  //     read: true,
  //     icon: Check,
  //   },
  // ]);

  // const markAsRead = (id) => {
  //   setNotifications(
  //     notifications.map((notif) =>
  //       notif.id === id ? { ...notif, read: true } : notif
  //     )
  //   );
  // };

  // const markAllAsRead = () => {
  //   setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  // };

  // const deleteNotification = (id) => {
  //   setNotifications(notifications.filter((notif) => notif.id !== id));
  // };

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // تأكد أن الـ backend يرجّع time بصيغة صالحة
      const withTime = res.data.notifications.map((n) => ({
        ...n,
        time: new Date(n.createdAt).toLocaleString(), // أو بصيغة relative
        icon: getIcon(n.type), // 👇 أضفها تحت
      }));

      setNotifications(withTime);
    } catch (err) {
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

      // تحديث الحالة
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
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
  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notifications
          </h1>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bus-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-blue-600">
                  {unreadCount}
                </p>
              </div>
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bus-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Today</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bus-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-orange-600">
                  {notifications.length}
                </p>
              </div>
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Tabs */}
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
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              getTypeColor={getTypeColor}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </TabsContent>

        <TabsContent value="trips" className="space-y-3">
          {tripNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              getTypeColor={getTypeColor}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </TabsContent>

        <TabsContent value="payments" className="space-y-3">
          {paymentNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              getTypeColor={getTypeColor}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </TabsContent>

        <TabsContent value="reminders" className="space-y-3">
          {reminderNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              getTypeColor={getTypeColor}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </TabsContent>
      </Tabs>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No notifications
          </h3>
          <p className="text-gray-600">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}
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
              onClick={() => onDelete(notification.id)}
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
