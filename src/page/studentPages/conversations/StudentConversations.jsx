import {
  MessageCircle,
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const StudentConversations = () => {
  // const [selectedConversation, setSelectedConversation] = useState(null);
  // const [message, setMessage] = useState("");
  // const messagesEndRef = useRef(null);

  // const conversations = [
  //   {
  //     id: 1,
  //     driverName: "Mohamed Ali",
  //     lastMessage: "I'll be there in 5 minutes",
  //     timestamp: "2 min ago",
  //     unread: 2,
  //     tripRoute: "Maadi → Downtown",
  //     status: "active",
  //     avatar: "MA",
  //     messages: [
  //       { id: 1, text: "Good morning! I'll be your driver today.", sender: "driver", time: "07:15 AM" },
  //       { id: 2, text: "Good morning! Thank you.", sender: "student", time: "07:16 AM" },
  //       { id: 3, text: "I'll be there in 5 minutes", sender: "driver", time: "08:20 AM" }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     driverName: "Ahmed Khaled",
  //     lastMessage: "Have a safe trip!",
  //     timestamp: "1 hour ago",
  //     unread: 0,
  //     tripRoute: "New Cairo → Heliopolis",
  //     status: "completed",
  //     avatar: "AK",
  //     messages: [
  //       { id: 1, text: "Trip completed successfully!", sender: "driver", time: "06:15 PM" },
  //       { id: 2, text: "Thank you for the ride!", sender: "student", time: "06:16 PM" },
  //       { id: 3, text: "Have a safe trip!", sender: "driver", time: "06:17 PM" }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     driverName: "Omar Hassan",
  //     lastMessage: "Trip will be delayed by 10 minutes",
  //     timestamp: "3 hours ago",
  //     unread: 1,
  //     tripRoute: "Zamalek → Maadi",
  //     status: "upcoming",
  //     avatar: "OH",
  //     messages: [
  //       { id: 1, text: "Hello! Your trip is scheduled for tomorrow.", sender: "driver", time: "02:15 PM" },
  //       { id: 2, text: "Trip will be delayed by 10 minutes", sender: "driver", time: "02:30 PM" }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     driverName: "Mahmoud Saad",
  //     lastMessage: "Thank you for choosing our service",
  //     timestamp: "Yesterday",
  //     unread: 0,
  //     tripRoute: "6th October → Giza",
  //     status: "completed",
  //     avatar: "MS",
  //     messages: [
  //       { id: 1, text: "Thank you for choosing our service", sender: "driver", time: "Yesterday" },
  //       { id: 2, text: "Hope you enjoyed the ride!", sender: "driver", time: "Yesterday" }
  //     ]
  //   }
  // ];

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'active':
  //       return 'bg-green-100 text-green-700';
  //     case 'upcoming':
  //       return 'bg-blue-100 text-blue-700';
  //     case 'completed':
  //       return 'bg-gray-100 text-gray-700';
  //     default:
  //       return 'bg-gray-100 text-gray-700';
  //   }
  // };

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   if (selectedConversation) {
  //     scrollToBottom();
  //   }
  // }, [selectedConversation]);

  // const handleSendMessage = () => {
  //   if (message.trim() && selectedConversation) {
  //     const newMessage = {
  //       id: selectedConversation.messages.length + 1,
  //       text: message,
  //       sender: "student",
  //       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     };

  //     const updatedConversation = {
  //       ...selectedConversation,
  //       messages: [...selectedConversation.messages, newMessage]
  //     };

  //     setSelectedConversation(updatedConversation);
  //     setMessage("");
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSendMessage();
  //   }
  // };

  const [contacts, setContacts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiver, setReceiver] = useState({
    name: "",
    role: "",
  });
  const [messages, setMessages] = useState("");
  const messagesEndRef = useRef(null);
  const socket = useRef();

  console.log(receiver, "recever");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          "https://bus-line-backend.onrender.com/api/messages/contact",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data, "sss");
        setContacts(data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    socket.current = io("https://bus-line-backend.onrender.com", {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.current.on("connect", () => {
      console.log("Socket connected:", socket.current.id);
    });
    socket.current.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("user-connected", (userId) => {
      setOnlineUsers((prev) => [...prev, userId]);
    });

    socket.current.on("user-disconnected", (userId) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.current.on("new-message", (message) => {
      console.log("New message received:", message);
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
      if (
        selectedConversation &&
        message.tripId === selectedConversation.tripId &&
        message.sender === selectedConversation.receiverId
      ) {
        const newMsg = {
          id: message._id,
          text: message.content,
          sender: "driver",
          time: new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setSelectedConversation((prev) => ({
          ...prev,
          messages: [...prev.messages, newMsg],
        }));
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [selectedConversation]);

  console.log(contacts);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedConversation) {
      scrollToBottom();
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      console.log("Sending message:", {
        tripId: selectedConversation.tripId,
        receiverId: selectedConversation.receiverId,
        content: message,
      });
      socket.current.emit("send-message", {
        tripId: selectedConversation.tripId,
        receiverId: selectedConversation.receiverId,
        content: message,
      });

      const newMessage = {
        id: Date.now(), // رقم مؤقت
        content: message,
        senderId: user._id,
        createdAt: new Date(),
      };

      // إضافة الرسالة إلى المحادثة الحالية
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // إفراغ حقل الإدخال
      setMessage("");

      // التمرير للأسفل
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-400px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List - Hidden on medium screens when chat is selected */}
        <div
          className={`lg:col-span-1 ${
            selectedConversation ? "hidden lg:block" : "block"
          }`}
        >
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Conversations
              </h1>
              <p className="text-gray-600">Chat with your drivers</p>
            </div>
          </div>

          {/* Search Bar */}
          <Card className="bus-card border-0 mb-4">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Conversations List */}
          <Card className="bus-card border-0 h-[calc(100%-200px)] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Recent Conversations
              </CardTitle>
              <CardDescription>Your chat history with drivers</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-full overflow-y-auto">
              <div className="space-y-0">
                {contacts
                  .filter((e) =>
                    e.name.toLowerCase().includes(search.toLowerCase())
                  )
                  ?.filter(
                    (contact, index, self) =>
                      index === self.findIndex((c) => c.id === contact.id)
                  )
                  ?.map((conversation, index) => (
                    <div key={conversation.id}>
                      <div
                        className={`flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          selectedConversation?.id === conversation.id
                            ? "bg-blue-50 border-r-4 border-blue-600"
                            : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src="/placeholder.svg"
                              alt={conversation.name}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {conversation.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {onlineUsers.includes(conversation.id) && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conversation.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {conversation.unread > 0 && (
                                <Badge className="bg-red-100 text-red-600 text-xs">
                                  {conversation.unread}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">
                                {conversation.timestamp}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate pr-2">
                              {conversation.lastMessage}
                            </p>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getStatusColor(
                                conversation.status
                              )}`}
                            >
                              {conversation.status}
                            </Badge>
                          </div>

                          <p className="text-xs text-gray-500 mt-1">
                            {conversation.role}
                          </p>
                        </div>
                      </div>
                      {index < conversations.length - 1 && <Separator />}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface - Shows when conversation is selected */}
        {selectedConversation && (
          <div
            className={`lg:col-span-2 ${
              selectedConversation ? "block" : "hidden"
            } flex flex-col h-full`}
          >
            {/* Chat Header */}
            <Card className="bus-card border-0 rounded-b-none">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt="Driver" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {selectedConversation.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold">
                          {selectedConversation.name}
                        </h2>
                        {selectedConversation.status === "active" && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.role}
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
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderId == user._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.senderId == user._id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.senderId == user._id
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
                  <span>
                    {selectedConversation.status === "active"
                      ? "Driver is online"
                      : "Driver is offline"}
                  </span>
                  <span>Messages are end-to-end encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State when no conversation is selected on large screens */}
        {!selectedConversation && (
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">
                Select a conversation
              </h3>
              <p>Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentConversations;
