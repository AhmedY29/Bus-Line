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
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = "https://bus-line-backend.onrender.com/api/messages";
const getToken = () =>
  localStorage.getItem("token") ||
  (JSON.parse(localStorage.getItem("user"))?.token ?? "");

const fetchContacts = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.contacts || [];
};

const fetchConversations = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.conversations || [];
};

const fetchConversation = async (tripId, userId) => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/${tripId}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.conversation || res.data;
};

const sendMessageApi = async (payload) => {
  const token = getToken();
  const res = await axios.post(`${API_URL}/`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.message || res.data;
};

const markAsReadApi = async (messageId) => {
  const token = getToken();
  await axios.patch(
    `${API_URL}/${messageId}/read`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const StudentConversations = () => {
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
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef();

  console.log(receiver, "recever");

  useEffect(() => {
    const loadContacts = async () => {
      setLoadingContacts(true);
      try {
        const contacts = await fetchContacts();
        setContacts(contacts);
      } catch (error) {
        setContacts([]);
      } finally {
        setLoadingContacts(false);
      }
    };
    loadContacts();

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

  // Helper to get the correct tripId and userId for conversation fetch
  const getContactConversationParams = (contact) => {
    // If contact has tripId, use it; otherwise, fallback to first tripId in contact.trips
    let tripId = contact.tripId;
    if (!tripId && Array.isArray(contact.trips) && contact.trips.length > 0) {
      tripId = contact.trips[0];
    }
    return { tripId, userId: contact.id };
  };

  const handleSelectConversation = async (contact) => {
    setSelectedConversation(null);
    setLoadingMessages(true);
    try {
      const { tripId, userId } = getContactConversationParams(contact);
      if (!tripId || !userId) {
        setSelectedConversation({ ...contact, messages: [] });
        setLoadingMessages(false);
        return;
      }
      const conv = await fetchConversation(tripId, userId);
      setSelectedConversation({
        ...contact,
        ...conv,
        tripId,
        id: userId,
        messages: conv.messages || [],
      });
      await Promise.all(
        (conv.messages || [])
          .filter(
            (m) =>
              !m.read && (m.receiver === user._id || m.receiverId === user._id)
          )
          .map((m) => markAsReadApi(m._id))
      );
    } catch {
      setSelectedConversation({ ...contact, messages: [] });
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedConversation) {
      const payload = {
        receiverId: selectedConversation.receiverId,
        tripId: selectedConversation.tripId,
        content: message,
      };
      try {
        const sent = await sendMessageApi(payload);
        setSelectedConversation((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), sent],
        }));
        setMessage("");
        scrollToBottom();
      } catch {}
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Helper to get sender/receiver id from message object
  const getSenderId = (msg) =>
    typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  const getReceiverId = (msg) =>
    typeof msg.receiver === "object" ? msg.receiver._id : msg.receiver;

  return (
    <div className="max-w-7xl p-4 mx-auto h-[calc(100vh-400px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div
          className={`lg:col-span-1 ${
            selectedConversation ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Conversations
              </h1>
              <p className="text-gray-600">Chat with your drivers</p>
            </div>
            {/* <div className="flex  ">
              <Badge className="bg-blue-100 text-blue-700">
                {conversations.reduce((total, conv) => total + conv.unread, 0)}{" "}
                unread
              </Badge>
            </div> */}
          </div>

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

          <Card className="bus-card border-0 h-">
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
                  ?.filter(
                    (contact, index, self) =>
                      index === self.findIndex((c) => c.id === contact.id)
                  )
                  ?.filter((e) =>
                    e.name.toLowerCase().includes(search.toLowerCase())
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
                      {index < contacts.length - 1 && <Separator />}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedConversation && (
          <div
            className={`lg:col-span-2 ${
              selectedConversation ? "block" : "hidden"
            } flex flex-col h-full`}
          >
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

            <Card className="flex-1 rounded-none overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col">
                {loadingMessages ? (
                  <div className="space-y-2 p-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-2/3 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation?.messages?.map((msg) => (
                      <div
                        key={msg._id || msg.id}
                        className={`flex ${
                          getSenderId(msg) == user._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            getSenderId(msg) == user._id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              getSenderId(msg) == user._id
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-t-none">
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
      </div>
    </div>
  );
};

export default StudentConversations;
