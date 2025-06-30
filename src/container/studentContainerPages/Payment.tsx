import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Payment: React.FC = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit"
  });

  const [bookingSummary] = useState({
    route: "New York → Boston",
    date: "2024-01-15",
    time: "09:00",
    passengers: 2,
    totalAmount: 45.00
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", paymentData);
    // Handle payment processing logic here
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={paymentData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="apple">Apple Pay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Card Holder Name</label>
                  <Input
                    type="text"
                    name="cardHolder"
                    value={paymentData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Back
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Pay ${bookingSummary.totalAmount}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Trip Details</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span className="font-medium">{bookingSummary.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{bookingSummary.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{bookingSummary.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers:</span>
                      <span className="font-medium">{bookingSummary.passengers}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ticket Price:</span>
                    <span>${(bookingSummary.totalAmount / bookingSummary.passengers).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{bookingSummary.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span>$2.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${(bookingSummary.totalAmount + 2).toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment; 