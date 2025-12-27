"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralDetails from "../tab-pages/general-details/general-details";
import BankDetails from "../tab-pages/bank-details/bank-details";
import DeliveryAddress from "../tab-pages/delivery-address/delivery-address";

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="general" className="w-full mt-20">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="general">General Details</TabsTrigger>
        <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
        <TabsTrigger value="delivery">Delivery Address</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <GeneralDetails />
      </TabsContent>
      <TabsContent value="bank">
        <BankDetails />
      </TabsContent>
      <TabsContent value="delivery">
        <DeliveryAddress />
      </TabsContent>
    </Tabs>
  );
}
