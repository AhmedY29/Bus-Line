import { useState, useEffect } from "react";
import { Camera, Edit, Mail, Phone, MapPin, Calendar, User, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; 
import { studentGetProfile, studentUpdateProfile } from "@/utils/student"; //  Import the update function from utils

const StudentProfile = () => {
  // State for data, loading, and errors
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  State to manage UI mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentGetProfile();
        setProfileData(response.data);
        setFormData(response.data); // Initialize form data
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- Event Handlers ---

  const handleEditToggle = () => {
    if (!isEditing) {
      // Entering edit mode, initialize form with current profile data
      setFormData(profileData);
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Handle nested address object
    if (name === "addressName") {
        setFormData(prev => ({...prev, address: { ...prev.address, addressName: value }}));
    } else {
        setFormData(prev => ({...prev, [name]: value}));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await studentUpdateProfile(formData);
      setProfileData(response.data); // Update the main display data
      localStorage.setItem("user", JSON.stringify(response.data)); // Update localStorage with new profile
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  // --- UI Helpers ---
  const getInitials = (name = "") => (name || "").split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A';
  
  // --- Render States ---
  if (loading) return <div className="p-8 text-center">Loading Profile...</div>;
  if (error && !profileData) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-2 space-y-6">
      <Card className="bus-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32"><AvatarImage src={profileData.avatarUrl || "/placeholder.svg"} /><AvatarFallback>{getInitials(profileData.name)}</AvatarFallback></Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"><Camera className="h-4 w-4" /></Button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-600 mb-4">Student ID: ...{profileData._id?.slice(-6)}</p>
            </div>

            {/* Conditional Edit/Save/Cancel Buttons */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />{isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="ghost" onClick={handleEditToggle}><X className="h-4 w-4" /></Button>
                </>
              ) : (
                <Button onClick={handleEditToggle}><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {error && <p className="p-2 text-center text-red-500 bg-red-100 rounded-md">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <Card className="bus-card border-0">
          <CardHeader><CardTitle><User className="inline h-5 w-5 mr-2" />Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} />
              ) : (
                <p className="font-medium">{profileData.name}</p>
              )}
            </div>
            <Separator />
            <div>
              <Label>Email</Label>
              <p className="flex items-center space-x-2 mt-1"><Mail className="h-4 w-4" /><span>{profileData.email}</span></p>
            </div>
            <Separator />
            <div>
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                 <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
              ) : (
                <p className="flex items-center space-x-2 mt-1"><Phone className="h-4 w-4" /><span>{profileData.phone || 'Not provided'}</span></p>
              )}
            </div>
            <Separator />
            <div>
              <Label htmlFor="addressName">Address</Label>
              {isEditing ? (
                 <Input id="addressName" name="addressName" value={formData.address?.addressName || ''} onChange={handleInputChange} />
              ) : (
                <p className="flex items-center space-x-2 mt-1"><MapPin className="h-4 w-4" /><span>{profileData.address?.addressName || 'Not provided'}</span></p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics Card */}
        <Card className="bus-card border-0">
          <CardHeader><CardTitle>Account Statistics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{profileData.totalTrips ?? 0}</p>
                <p className="text-sm text-gray-600">Total Trips Completed</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{profileData.activeBookings ?? 0}</p>
                <p className="text-sm text-gray-600">Active Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;