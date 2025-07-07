import { useState, useRef, useEffect } from "react";
import { MessageCircle, Search, Phone, MoreVertical, Send, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  studentGetConversations,
  studentGetMessages,
  studentSendMessage
} from "@/utils/student"; // API functions

const StudentConversations = () => {
  // State for data fetched from backend
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // State for UI control and inputs
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  
  // State for loading and errors
  const [loading, setLoading] = useState({ list: true, chat: false });
  const [error, setError] = useState(null);

  // --- Data Fetching ---

  // 1. Fetch the list of all conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(p => ({ ...p, list: true }));
      try {
        const response = await studentGetConversations();

        setConversations(response.data); 
      } catch (err) {
        setError("Failed to load conversations.");
      } finally {
        setLoading(p => ({ ...p, list: false }));
      }
    };
    fetchConversations();
  }, []);

  // 2. Fetch messages for a conversation when it's selected
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(p => ({ ...p, chat: true }));
      try {
        const response = await studentGetMessages(selectedConversation._id);
        setMessages(response.data);
      } catch (err) {
        setError("Failed to load messages.");
      } finally {
        setLoading(p => ({ ...p, chat: false }));
      }
    };
    fetchMessages();
  }, [selectedConversation]);
  
  // Auto-scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Event Handlers ---

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;

    const tempId = Date.now(); // Create a temporary ID for the optimistic update
    const newMessage = {
      _id: tempId,
      text: message,
      sender: "student", // Assume the current user is always the student sender
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI Update: Add the new message to the list immediately
    setMessages(prev => [...prev, newMessage]);
    const messageToSend = message;
    setMessage(""); // Clear the input field right away

    try {
      // Send the message to the backend
      const response = await studentSendMessage(selectedConversation._id, { text: messageToSend });
      // Replace the temporary message with the real one from the server (with a real _id and createdAt)
      setMessages(prev => prev.map(m => (m._id === tempId ? response.data : m)));
    } catch (err) {
      setError("Failed to send message.");
      // On error, remove the optimistically added message
      setMessages(prev => prev.filter(m => m._id !== tempId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // --- UI Helpers ---
  const getInitials = (name = "") => (name || "").split(' ').map(n => n[0]).join('').toUpperCase() || 'D';
  const getStatusColor = (status) => {

    return 'bg-gray-100 text-gray-700';
  };

  const filteredConversations = conversations.filter(c => 
    c.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List Pane */}
        <div className={`lg:col-span-1 ${selectedConversation ? 'hidden lg:block' : 'block'}`}>
          <div className="mb-6"><h1 className="text-3xl font-bold">Conversations</h1></div>
          <Card className="mb-4"><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" /><Input placeholder="Search conversations..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div></CardContent></Card>
          <Card className="h-[calc(100%-150px)] overflow-hidden">
            <CardHeader><CardTitle>Recent Conversations</CardTitle></CardHeader>
            <CardContent className="p-0 h-full overflow-y-auto">
              {loading.list ? <p className="p-4">Loading...</p> : 
               error ? <p className="p-4 text-red-500">{error}</p> :
               filteredConversations.map((convo, index) => (
                <div key={convo._id}>
                  <div onClick={() => setSelectedConversation(convo)} className={`flex items-center space-x-4 p-4 cursor-pointer ${selectedConversation?._id === convo._id ? 'bg-blue-50' : ''}`}>
                    <Avatar className="h-12 w-12"><AvatarFallback>{getInitials(convo.driverName)}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between"><h3 className="font-semibold">{convo.driverName}</h3><span className="text-xs text-gray-500">{new Date(convo.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
                      <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                    </div>
                  </div>
                  {index < conversations.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface Pane */}
        <div className={`lg:col-span-2 ${selectedConversation ? 'block' : 'hidden lg:flex'} flex-col h-full`}>
          {selectedConversation ? (
            <>
              <Card className="rounded-b-none"><CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSelectedConversation(null)}><ArrowLeft/></Button>
                  <Avatar className="h-12 w-12"><AvatarFallback>{getInitials(selectedConversation.driverName)}</AvatarFallback></Avatar>
                  <div><h2 className="text-lg font-semibold">{selectedConversation.driverName}</h2><p className="text-sm text-gray-600">{selectedConversation.tripRoute}</p></div>
                </div>
                <div className="flex items-center space-x-2"><Button variant="outline" size="sm"><Phone className="w-4 h-4 mr-2"/>Call</Button><Button variant="ghost" size="icon"><MoreVertical/></Button></div>
              </CardContent></Card>
              <Card className="flex-1 rounded-none overflow-hidden"><CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loading.chat ? <p>Loading messages...</p> : 
                   messages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-4 py-2 rounded-lg ${msg.sender === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 text-right ${msg.sender === 'student' ? 'text-blue-200' : 'text-gray-500'}`}>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent></Card>
              <Card className="rounded-t-none"><CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Input placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}><Send className="w-5 h-5"/></Button>
                </div>
              </CardContent></Card>
            </>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg">
              <MessageCircle className="w-16 h-16 text-gray-300"/>
              <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
              <p className="text-gray-500">Choose a chat from the list to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentConversations;