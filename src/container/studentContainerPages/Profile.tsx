import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
            <p className="text-gray-600">View and update your personal information.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <Input type="text" defaultValue="Jane Doe" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input type="email" defaultValue="jane.doe@email.com" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone</label>
                <Input type="tel" defaultValue="+1 555-123-4567" />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 