import React, { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";

function StudentChat() {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      sender: "driver",
      text: "Good morning! I'm ready for today's route.",
      time: "09:00 AM",
      date: "Today",
    },
    {
      id: 2,
      sender: "admin",
      text: "Great! Please make sure to check the bus before starting.",
      time: "09:02 AM",
      date: "Today",
    },
    {
      id: 3,
      sender: "driver",
      text: "All checks completed. Bus is in good condition.",
      time: "09:15 AM",
      date: "Today",
    },
    {
      id: 4,
      sender: "admin",
      text: "Perfect! Have a safe trip as,mdnasjkbdjashbdjashdjashdasjhdajhdjahsduhasuidhsaudhand keep me updated.",
      time: "09:16 AM",
      date: "Today",
    },
    {
      id: 5,
      sender: "driver",
      text: "Will do. Starting the route now.",
      time: "09:20 AM",
      date: "Today",
    },
    {
      id: 6,
      sender: "admin",
      text: "Thank you! Let me know if you need anything.",
      time: "09:22 AM",
      date: "Today",
    },
    {
      id: 7,
      sender: "driver",
      text: "All good so far. Just passed the first stop.",
      time: "09:30 AM",
      date: "Today",
    },
    {
      id: 8,
      sender: "admin",
      text: "Great! Keep me posted on your progress.",
      time: "09:32 AM",
      date: "Today",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#F5F7FA] w-full h-[90vh] p-4">
      <div className="bg-white rounded-lg shadow-md h-full flex">
        {/* Chat Area */}
        <div className=" flex w-full flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="font-medium text-gray-900">Driver name</h1>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-neutral-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === "admin"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-xs md:text-sm break-all">{msg.text}</p>
                  <p
                    className={`text-xs md:text-sm break-all mt-1 ${
                      msg.sender === "admin" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-11/12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="w-2/12 md:w-1/12 flex justify-center items-center md:px-2 lg:px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <HiPaperAirplane className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentChat;
