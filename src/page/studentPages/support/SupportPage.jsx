import { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronRight,
  Camera,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [vehicleInfo, setVehicleInfo] = useState({
    carModel: "",
    licensePlate: "",
    insuranceExpiry: "",
  });

  const [licenseImage, setLicenseImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const faqs = [
    {
      id: 1,
      question: "How do I book a bus ticket?",
      answer:
        "To book a bus ticket, go to 'New Booking' from your dashboard, select your destination, choose your pickup neighborhood, and select from available trips. Complete the payment to confirm your booking.",
      category: "booking",
    },
    {
      id: 2,
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 2 hours before departure time. Go to 'My Bookings', find your trip, and click 'Cancel Booking'. Refund policies apply based on cancellation time.",
      category: "booking",
    },
    {
      id: 3,
      question: "How do I track my bus live?",
      answer:
        "You can track your bus in real-time by going to 'Live Tracking' section. This feature is available 30 minutes before your scheduled departure time.",
      category: "tracking",
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards (Visa, Mastercard), digital wallets (Fawry, Vodafone Cash), and mobile banking payments.",
      category: "payment",
    },
    {
      id: 5,
      question: "How do I contact my driver?",
      answer:
        "You can contact your driver through the chat feature available in your active booking or through the 'Messages' section in your dashboard.",
      category: "communication",
    },
    {
      id: 6,
      question: "What if my bus is late?",
      answer:
        "You'll receive automatic notifications about any delays. You can also track your bus live to see its current location and estimated arrival time.",
      category: "tracking",
    },
  ];

  const contactOptions = [
    {
      title: "Call Support",
      description: "Speak directly with our support team",
      icon: Phone,
      action: "Call Now",
      contact: "+20 16 xxx xxxx",
      available: "24/7",
    },
    {
      title: "Email Support",
      description: "Send us your questions via email",
      icon: Mail,
      action: "Send Email",
      contact: "support@bus-line.com",
      available: "Response within 24h",
    },
    {
      title: "Live Chat",
      description: "Chat with our support agents",
      icon: MessageCircle,
      action: "Start Chat",
      contact: "Available now",
      available: "Mon-Fri 8AM-8PM",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Support ticket submitted:", contactForm);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get help with your bookings, payments, and more</p>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactOptions.map((option, index) => (
          <Card key={index} className="border-0 hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <option.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <p className="text-sm font-medium text-blue-600 mb-2">{option.contact}</p>
              <p className="text-xs text-gray-500 mb-4">{option.available}</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} />
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">No FAQs found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment & Vehicle Info + Contact Form */}
        <div className="space-y-6">
          {/* Payment Info Card */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Payment Information</CardTitle>
              <CardDescription>Enter your payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                  }
                  placeholder="1234 1234 1234 1234"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) =>
                      setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                    }
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    placeholder="123"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Info Card */}
          {/* <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Vehicle Information</CardTitle>
              <CardDescription>Provide vehicle details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="carModel">Car Model</Label>
                <Input
                  id="carModel"
                  value={vehicleInfo.carModel}
                  onChange={(e) =>
                    setVehicleInfo({ ...vehicleInfo, carModel: e.target.value })
                  }
                  placeholder="Toyota Corolla"
                />
              </div>
              <div>
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  value={vehicleInfo.licensePlate}
                  onChange={(e) =>
                    setVehicleInfo({ ...vehicleInfo, licensePlate: e.target.value })
                  }
                  placeholder="ABC-1234"
                />
              </div>
              <div>
                <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                <Input
                  id="insuranceExpiry"
                  type="date"
                  value={vehicleInfo.insuranceExpiry}
                  onChange={(e) =>
                    setVehicleInfo({ ...vehicleInfo, insuranceExpiry: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseImage">Upload License Image</Label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 border rounded overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Camera className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    id="licenseImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="licenseImage"
                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Contact Form */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Contact Support</CardTitle>
              <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    placeholder="Brief description of your issue"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Response Time</h4>
                <p className="text-sm text-blue-700">
                  We typically respond to support requests within 24 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
        <span className="font-medium text-gray-900">{faq.question}</span>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-3 text-sm text-gray-600 border-l-2 border-blue-200 ml-4 mt-2">
        {faq.answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SupportPage;