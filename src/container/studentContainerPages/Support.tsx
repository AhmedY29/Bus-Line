import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Support & Help</CardTitle>
            <p className="text-gray-600">Need assistance? Contact us or browse FAQs below.</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Button className="w-full mb-2">Contact Support</Button>
              <Button className="w-full" variant="outline">Live Chat</Button>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>How do I change my booking?</li>
                <li>How do I request a refund?</li>
                <li>How do I contact my driver?</li>
                <li>What if my bus is late?</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support; 