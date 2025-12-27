"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function DeliveryAddressInfo() {
  const [loading, setLoading] = React.useState(true);

  const [form, setForm] = React.useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  React.useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch("/api/profile/delivery-address");
        if (res.ok) {
          const data = await res.json();
          setForm({
            fullName: data.fullName || "",
            phone: data.phone || "",
            addressLine1: data.addressLine1 || "",
            addressLine2: data.addressLine2 || "",
            city: data.city || "",
            state: data.state || "",
            pincode: data.pincode || "",
            country: data.country || "India",
          });
        }
      } catch (err) {
        console.error("Error loading delivery address:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    try {
      const res = await fetch("/api/profile/delivery-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Delivery address saved successfully!");
      } else {
        alert("Failed to save address.");
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
          <div className="text-center py-8 text-muted-foreground">
            Loading delivery address...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="9876543210"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={form.addressLine1}
              onChange={onChange}
              placeholder="House No., Building, Street"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              value={form.addressLine2}
              onChange={onChange}
              placeholder="Landmark, Area (optional)"
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="Mumbai"
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={form.state}
              onChange={onChange}
              placeholder="Maharashtra"
            />
          </div>

          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              name="pincode"
              value={form.pincode}
              onChange={onChange}
              placeholder="400001"
              maxLength={6}
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={form.country}
              onChange={onChange}
              placeholder="India"
            />
          </div>

          <div className="sm:col-span-2">
            <Button className="w-full" size="lg" onClick={saveAddress}>
              Save Delivery Address
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}