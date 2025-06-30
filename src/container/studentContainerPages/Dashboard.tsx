// Dashboard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome, Student!</CardTitle>
            <p className="text-gray-600">Access your bookings, track trips, and manage your profile.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Button className="w-full" variant="outline">New Booking</Button>
              <Button className="w-full" variant="outline">Booking History</Button>
              <Button className="w-full" variant="outline">Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
