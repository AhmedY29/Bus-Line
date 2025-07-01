
import { useState, useRef, useEffect } from "react";
import { Send, Phone, MoreVertical, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const StudentMessages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning! I'll be your driver today. Currently preparing for departure.",
      sender: "driver",
      time: "07:15 AM",
      read: true
    },
    {
      id: 2,
      text: "Good morning! Thank you for the update.",
      sender: "student",
      time: "07:16 AM",
      read: true
    },
    {
      id: 3,
      text: "We're running about 5 minutes behind schedule due to traffic. Will update you shortly.",
      sender: "driver",
      time: "07:35 AM",
      read: true
    },
    {
      id: 4,
      text: "No problem, thanks for letting me know!",
      sender: "student",
      time: "07:36 AM",
      read: true
    },
    {
      id: 5,
      text: "Just picked up passengers from Maadi. Next stop is your location in about 10 minutes.",
      sender: "driver",
      time: "08:20 AM",
      read: false
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "student",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const driverInfo = {
    name: "Ahmed Mahmoud",
    busNumber: "BUS-001",
    rating: 4.8,
    phone: "+20 1xx xxx xxxx",
    isOnline: true
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      {/* Chat Header */}
      <Card className="bus-card border-0 rounded-b-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="Driver" />
                <AvatarFallback className="bg-blue-100 text-blue-600">AM</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">{driverInfo.name}</h2>
                  {driverInfo.isOnline && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {driverInfo.busNumber} • ★ {driverInfo.rating}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 rounded-none border-x border-gray-200 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'student' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="bus-card border-0 rounded-t-none border-t-0">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="gradient-button px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>{driverInfo.isOnline ? 'Driver is online' : 'Driver is offline'}</span>
            <span>Messages are end-to-end encrypted</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Button variant="outline" size="sm" className="text-xs">
          Share Location
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          Running Late
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          Thank You
        </Button>
      </div>
    </div>
  );
};

export default StudentMessages;
