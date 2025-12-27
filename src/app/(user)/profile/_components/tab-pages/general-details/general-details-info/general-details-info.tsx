"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Edit, User, Upload } from "lucide-react";

export default function GeneralDetailsInfo() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    dob: "",
    gender: "",
    country: "India",
    language: "English",
  });

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile/general-details");
        if (!res.ok) {
          console.warn("Profile not found or error fetching");
          setLoading(false);
          return;
        }

        const data = await res.json();

        let phoneCode = "+91";
        let phoneNumber = "";

        if (data.phone) {
          const cleaned = data.phone.replace(/[\s\-()]/g, "");
          if (cleaned.startsWith("+91") && cleaned.length >= 12) {
            phoneCode = "+91";
            phoneNumber = cleaned.substring(3);
          } else if (cleaned.startsWith("+1")) {
            phoneCode = "+1";
            phoneNumber = cleaned.substring(2);
          } else if (cleaned.startsWith("+44")) {
            phoneCode = "+44";
            phoneNumber = cleaned.substring(3);
          } else {
            const match = cleaned.match(/^(\+\d{1,3})(\d{7,15})$/);
            if (match) {
              phoneCode = match[1];
              phoneNumber = match[2];
            } else {
              phoneNumber = cleaned.replace(/^\+/, "");
            }
          }
        }

        let dobDisplay = "";
        if (data.dob) {
          const dobDate = new Date(data.dob);
          if (!isNaN(dobDate.getTime())) {
            dobDisplay = dobDate.toISOString().split("T")[0];
            setDate(dobDate);
          }
        }

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneCode,
          phone: phoneNumber,
          dob: dobDisplay,
          gender: data.gender || "",
          country: data.country || "India",
          language: data.language || "English",
        });

        // If user has uploaded image before, show it
        if (data.image) {
          setAvatarPreview(data.image);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload immediately (recommended)
    uploadAvatar(file);
  };

  // Upload avatar to backend
  const uploadAvatar = async (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("/api/profile/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        // Optional: backend returns new image URL
        if (result.imageUrl) {
          setAvatarPreview(result.imageUrl);
        }
        alert("Profile picture updated successfully!");
      } else {
        alert("Failed to upload image.");
        setAvatarPreview(null); // revert preview on error
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
      setAvatarPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const saveDetails = async () => {
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      phoneCode: form.phoneCode,
      phone: form.phone.replace(/[^\d]/g, ""),
      dob: form.dob || null,
      gender: form.gender || null,
      country: form.country || null,
      language: form.language || null,
    };

    try {
      const res = await fetch("/api/profile/general-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("General details saved successfully!");
      } else {
        alert("Failed to save details.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Avatar with Upload */}
        <div className="relative w-fit mx-auto mb-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={avatarPreview || "/api/user/avatar"} />
            <AvatarFallback className="bg-gray-200">
              <User className="h-16 w-16 text-gray-500" />
            </AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Upload className="h-4 w-4 animate-pulse" />
            ) : (
              <Edit className="h-4 w-4" />
            )}
          </Button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={form.firstName} onChange={onChange} />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={form.lastName} onChange={onChange} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} disabled />
          </div>

          <div>
            <Label>Phone</Label>
            <div className="flex gap-2">
              <Input name="phoneCode" value={form.phoneCode} onChange={onChange} className="w-24" placeholder="+91" />
              <Input name="phone" value={form.phone} onChange={onChange} placeholder="9876543210" />
            </div>
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-left font-normal">
                  {form.dob || "Pick a date"}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setForm({ ...form, dob: d ? d.toISOString().split("T")[0] : "" });
                    setOpen(false);
                  }}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" name="gender" value={form.gender} onChange={onChange} placeholder="e.g. Male, Female, Other" />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" value={form.country} onChange={onChange} />
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Input id="language" name="language" value={form.language} onChange={onChange} />
          </div>

          <div className="sm:col-span-2">
            <Button className="w-full" size="lg" onClick={saveDetails}>
              Save General Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}