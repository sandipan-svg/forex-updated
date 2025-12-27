"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

export default function BankDetailsInfo() {
  const [loading, setLoading] = React.useState(true);

  const [form, setForm] = React.useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
    holderName: "",
  });

  // Fetch bank details on mount
  React.useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await fetch("/api/profile/bank");
        if (res.ok) {
          const data = await res.json();
          setForm({
            bankName: data.bankName || "",
            accountNumber: data.accountNumber || "",
            ifsc: data.ifsc || "",
            holderName: data.holderName || "",
          });
        }
        // If no data or error, just keep empty form
      } catch (err) {
        console.error("Error loading bank details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveBankDetails = async () => {
    try {
      const res = await fetch("/api/profile/bank", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Bank details saved successfully!");
      } else {
        alert("Failed to save bank details.");
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
          <div className="text-center py-8">Loading bank details...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              value={form.bankName}
              onChange={onChange}
              placeholder="e.g. State Bank of India"
            />
          </div>

          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={form.accountNumber}
              onChange={onChange}
              placeholder="123456789012"
              type="text"
            />
          </div>

          <div>
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input
              id="ifsc"
              name="ifsc"
              value={form.ifsc}
              onChange={onChange}
              placeholder="SBIN0001234"
              className="uppercase"
            />
          </div>

          <div>
            <Label htmlFor="holderName">Account Holder Name</Label>
            <Input
              id="holderName"
              name="holderName"
              value={form.holderName}
              onChange={onChange}
              placeholder="As per bank records"
            />
          </div>

          <div className="sm:col-span-2">
            <Button className="w-full" size="lg" onClick={saveBankDetails}>
              Save Bank Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}