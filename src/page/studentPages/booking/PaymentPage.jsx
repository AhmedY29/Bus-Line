import { useState } from "react";
import {
  CreditCard,
  Shield,
  ArrowLeft,
  Check,
  Wallet,
  Smartphone,
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trip, destination, neighborhood } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    phoneNumber: "",
  });

  if (!trip) {
    navigate("/student/new-booking");
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsProcessing(false);
    navigate("/student/booking-confirmation", {
      state: {
        booking: {
          id: Math.random().toString(36).substr(2, 9),
          trip,
          destination,
          neighborhood,
          paymentMethod,
          amount: trip.price,
          bookingDate: new Date().toISOString(),
          status: "confirmed",
        },
      },
    });
  };

  return (
    <div className="p-2 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600">Complete your booking payment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bus-card border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="font-semibold">
                      Credit/Debit Card
                    </Label>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Wallet className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor="wallet" className="font-semibold">
                      Digital Wallet
                    </Label>
                    <p className="text-sm text-gray-600">
                      Fawry, Vodafone Cash, Orange Money
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Smartphone className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor="mobile" className="font-semibold">
                      Mobile Payment
                    </Label>
                    <p className="text-sm text-gray-600">
                      Pay via mobile banking
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details Form */}
          {paymentMethod === "card" && (
            <Card className="bus-card border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Card Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="Ahmed Hassan"
                    value={formData.cardName}
                    onChange={(e) =>
                      handleInputChange("cardName", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        handleInputChange("expiryDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "mobile" && (
            <Card className="bus-card border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Mobile Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phoneNumber">Mobile Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+20 1xx xxx xxxx"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Secure Payment</p>
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="bus-card border-0 sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-600">From {neighborhood}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-medium">{trip.busNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">{trip.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Arrival:</span>
                  <span className="font-medium">{trip.arrivalTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Driver:</span>
                  <span className="font-medium">{trip.driverName}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ticket Price:</span>
                  <span>{trip.price} SAR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee:</span>
                  <span>5 SAR</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{trip.price + 5} SAR</span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full gradient-button h-12 text-lg font-semibold"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Complete Payment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
