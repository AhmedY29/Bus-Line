
import { Bell, Shield, Moon, Globe, CreditCard, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const StudentSettings = () => {
  return (
    <div className="p-2 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      {/* Notifications Settings */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600" />
            Notifications
          </CardTitle>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-gray-600">Get booking updates via SMS</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive trip confirmations by email</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Trip Reminders</h3>
              <p className="text-sm text-gray-600">Get reminded before your trip</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Privacy & Security
          </CardTitle>
          <CardDescription>Manage your privacy and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Share Location</h3>
              <p className="text-sm text-gray-600">Allow sharing your location with drivers</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Profile Visibility</h3>
              <p className="text-sm text-gray-600">Make your profile visible to drivers</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <Button variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Moon className="h-5 w-5 mr-2 text-blue-600" />
            Appearance
          </CardTitle>
          <CardDescription>Customize your app appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-600">Use dark theme for better night viewing</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-3">Language</h3>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <Button variant="outline" size="sm">
                English (US)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
            Payment Settings
          </CardTitle>
          <CardDescription>Manage your payment methods and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Pay</h3>
              <p className="text-sm text-gray-600">Automatically pay for bookings</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-medium">Payment Methods</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 1234</p>
                    <p className="text-sm text-gray-600">Expires 12/26</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="bus-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
            App Settings
          </CardTitle>
          <CardDescription>General app preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Offline Mode</h3>
              <p className="text-sm text-gray-600">Save data for offline use</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Update</h3>
              <p className="text-sm text-gray-600">Automatically update the app</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div>
            <Button variant="outline" className="w-full md:w-auto">
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSettings;
