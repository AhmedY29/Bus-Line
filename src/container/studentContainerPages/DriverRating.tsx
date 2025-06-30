import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DriverRating: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Rate Your Driver</CardTitle>
            <p className="text-gray-600">Share your feedback about your recent trip.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Rating</label>
                <select className="w-full p-2 border rounded">
                  <option>5 - Excellent</option>
                  <option>4 - Good</option>
                  <option>3 - Average</option>
                  <option>2 - Poor</option>
                  <option>1 - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Comments</label>
                <textarea className="w-full p-2 border rounded" rows={4} placeholder="Write your feedback here..." />
              </div>
              <Button type="submit" className="w-full">Submit Rating</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverRating; 