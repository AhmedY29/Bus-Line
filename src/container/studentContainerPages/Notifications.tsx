import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, message: "Your bus is arriving in 10 minutes.", time: "Just now" },
    { id: 2, message: "Payment received for booking BK2024001.", time: "1 hour ago" },
    { id: 3, message: "Your trip to Boston is confirmed!", time: "Yesterday" }
  ];
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Notifications</CardTitle>
            <p className="text-gray-600">Stay updated with the latest alerts and messages.</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {notifications.map(n => (
                <li key={n.id} className="bg-blue-50 p-3 rounded">
                  <div className="font-medium">{n.message}</div>
                  <div className="text-xs text-gray-500">{n.time}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications; 