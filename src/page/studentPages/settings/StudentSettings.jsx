import { useState, useEffect } from "react";
import { Bell, Shield, Moon, Globe, CreditCard, Smartphone, Check, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { studentGetSettings, studentUpdateSettings } from "@/utils/student"; // Your API functions

// A component to show the saving status (loading, saved, or error)
const SaveStatusIndicator = ({ status }) => {
  if (status === 'saving') {
    return <Loader2 className="w-4 h-4 animate-spin text-gray-500" />;
  }
  if (status === 'saved') {
    return <Check className="w-4 h-4 text-green-500" />;
  }
  if (status === 'error') {
    return <X className="w-4 h-4 text-red-500" />;
  }
  return null;
};

const StudentSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use an object to track the saving status of each individual setting
  const [savingStatus, setSavingStatus] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await studentGetSettings();
        setSettings(response.data);
      } catch (err) {
        setError("Failed to load your settings. Please refresh the page.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSettingChange = async (key, value) => {
    const originalSettings = { ...settings };
    
    // Optimistic UI update for a snappy feel
    setSettings(current => ({ ...current, [key]: value }));
    setSavingStatus(prev => ({ ...prev, [key]: 'saving' }));
    
    try {
      await studentUpdateSettings({ [key]: value });
      setSavingStatus(prev => ({ ...prev, [key]: 'saved' }));
    } catch (err) {
      setError(`Failed to save setting: ${key}.`);
      setSettings(originalSettings); // Revert on error
      setSavingStatus(prev => ({ ...prev, [key]: 'error' }));
    } finally {
      // Reset the status icon after a short delay
      setTimeout(() => setSavingStatus(prev => ({ ...prev, [key]: 'idle' })), 2000);
    }
  };
  
  if (loading) return <div className="p-8 text-center">Loading Settings...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!settings) return <div className="p-8 text-center">Could not load settings data.</div>;

  return (
    <div className="p-2 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      {/* Notifications Settings */}
      <Card className="bus-card border-0">
        <CardHeader><CardTitle className="flex items-center"><Bell className="h-5 w-5 mr-2" />Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div><h3>Push Notifications</h3><p className="text-sm text-gray-600">On your device</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.pushNotifications} /><Switch checked={settings.pushNotifications} onCheckedChange={(val) => handleSettingChange('pushNotifications', val)} /></div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><h3>SMS Notifications</h3><p className="text-sm text-gray-600">For booking updates</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.smsNotifications} /><Switch checked={settings.smsNotifications} onCheckedChange={(val) => handleSettingChange('smsNotifications', val)} /></div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><h3>Email Notifications</h3><p className="text-sm text-gray-600">For trip confirmations</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.emailNotifications} /><Switch checked={settings.emailNotifications} onCheckedChange={(val) => handleSettingChange('emailNotifications', val)} /></div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bus-card border-0">
        <CardHeader><CardTitle className="flex items-center"><Shield className="h-5 w-5 mr-2" />Privacy & Security</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div><h3>Share Location</h3><p className="text-sm text-gray-600">Allow sharing your location with drivers</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.shareLocation} /><Switch checked={settings.shareLocation} onCheckedChange={(val) => handleSettingChange('shareLocation', val)} /></div>
          </div>
          <Separator />
          <div><Button variant="outline">Change Password</Button></div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bus-card border-0">
        <CardHeader><CardTitle className="flex items-center"><Moon className="h-5 w-5 mr-2" />Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div><h3>Dark Mode</h3><p className="text-sm text-gray-600">Use dark theme for better night viewing</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.darkMode} /><Switch checked={settings.darkMode} onCheckedChange={(val) => handleSettingChange('darkMode', val)} /></div>
          </div>
          <Separator />
          <div><h3 className="font-medium mb-3">Language</h3><Button variant="outline"><Globe className="h-4 w-4 mr-2" /> English (US)</Button></div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="bus-card border-0">
        <CardHeader><CardTitle className="flex items-center"><CreditCard className="h-5 w-5 mr-2" />Payment Settings</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div><h3>Auto-Pay</h3><p className="text-sm text-gray-600">Automatically pay for bookings</p></div>
            <div className="flex items-center gap-3"><SaveStatusIndicator status={savingStatus.autoPay} /><Switch checked={settings.autoPay} onCheckedChange={(val) => handleSettingChange('autoPay', val)} /></div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-medium">Payment Methods</h3>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3"><CreditCard className="h-5 w-5" /><div><p>•••• 1234</p><p className="text-sm text-gray-600">Expires 12/26</p></div></div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <Button variant="outline" className="w-full">Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default StudentSettings;