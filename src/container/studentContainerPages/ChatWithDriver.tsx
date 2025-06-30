import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatWithDriver: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Chat with Driver</CardTitle>
            <p className="text-gray-600">Send a message to your driver for any questions or updates.</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded mb-4 p-4 overflow-y-auto">Chat messages will appear here.</div>
            <form className="flex gap-2">
              <Input type="text" placeholder="Type your message..." className="flex-1" />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatWithDriver; 