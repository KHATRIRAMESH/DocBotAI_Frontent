'use client';

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Camera, User2 } from "lucide-react";

export default function SettingsPage() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [micAccess, setMicAccess] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);

  const [docUploadPref, setDocUploadPref] = useState("ask");
  const [marketingPref, setMarketingPref] = useState("ask");

  return (
    <main className="h-screen overflow-y-auto bg-gray-50">
      <section className="mx-auto max-w-5xl space-y-6 md:space-y-10 p-4 md:p-6 lg:p-10 pt-20 md:pt-6">
        {/* Account Settings */}
        <Card className="shadow-md">
          <CardHeader className="pb-4 md:pb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700">Account Settings</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Image and Basic Info Section */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48">
                    <User2 className="h-full w-full rounded-full border-4 border-blue-100 bg-white p-3 text-blue-400" />
                    <label
                      htmlFor="avatar"
                      className="absolute bottom-1 right-1 md:bottom-2 md:right-2 cursor-pointer rounded-full bg-blue-700 p-1.5 md:p-2 shadow-md hover:bg-blue-800 transition-colors"
                    >
                      <Camera size={16} className="text-white md:w-[18px] md:h-[18px]" />
                    </label>
                    <input id="avatar" type="file" accept="image/*" className="hidden" />
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 gap-4 md:gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="userId" className="text-sm md:text-base">User ID (read‑only)</Label>
                    <Input
                      id="userId"
                      value="USR‑298174"
                      disabled
                      className="cursor-not-allowed bg-gray-100 text-gray-500 h-10 md:h-11"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm md:text-base">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="h-10 md:h-11" />
                  </div>
                </div>
              </div>

              {/* Other Form Fields - Full Width */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-10 md:h-11" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+977 9800000000" className="h-10 md:h-11" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dob" className="text-sm md:text-base">Date of Birth</Label>
                  <Input id="dob" type="date" className="h-10 md:h-11" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address" className="text-sm md:text-base">Address</Label>
                  <Input id="address" placeholder="123 Main Street, Kathmandu" className="h-10 md:h-11" />
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex justify-end">
              <Button className="w-full sm:w-48 cursor-pointer bg-blue-700 hover:bg-blue-800 text-white h-10 md:h-11" type="submit">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Media & Access Control */}
        <Card className="shadow-md">
          <CardHeader className="pb-4 md:pb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-700">Media & Access Control</h2>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            {[
              { id: 1, label: "Download generated reports automatically", state: cameraAccess, setState: setCameraAccess },
              { id: 2, label: "Upload the document to highest quality", state: micAccess, setState: setMicAccess },
              { id: 3, label: "Delete files that are unused for over 1 month", state: locationAccess, setState: setLocationAccess },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-white px-4 md:px-5 py-3 md:py-4 shadow-sm ring-1 ring-gray-200"
              >
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <Switch
                  checked={item.state}
                  onCheckedChange={item.setState}
                  aria-label={`Toggle ${item.label}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-md mb-6 md:mb-20">
  <CardHeader className="pb-4 md:pb-6">
    <h2 className="text-xl md:text-2xl font-semibold text-blue-700">Notification Settings</h2>
  </CardHeader>
  <CardContent className="space-y-4 md:space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Label className="text-sm md:text-base">
        Receive Document Upload Requests Notifications 
      </Label>
      <Select value={docUploadPref} onValueChange={setDocUploadPref}>
        <SelectTrigger className="w-40 capitalize bg-white h-10 md:h-11 cursor-pointer">
          {docUploadPref === "ask"
            ? "Always ask"
            : docUploadPref === "agree"
            ? "Always agree"
            : "Never"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ask" className="capitalize cursor-pointer">Always ask</SelectItem>
          <SelectItem value="agree" className="capitalize cursor-pointer">Always agree</SelectItem>
          <SelectItem value="never" className="capitalize cursor-pointer">Never</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-4">
      <Label className="text-sm md:text-base">
        Receive Marketing Emails and Offers 
      </Label>
      <Select value={marketingPref} onValueChange={setMarketingPref}>
        <SelectTrigger className="w-40 capitalize bg-white h-10 md:h-11 cursor-pointer">
          {marketingPref === "ask"
            ? "Always ask"
            : marketingPref === "agree"
            ? "Always agree"
            : "Never"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ask" className="capitalize cursor-pointer">Always ask</SelectItem>
          <SelectItem value="agree" className="capitalize cursor-pointer">Always agree</SelectItem>
          <SelectItem value="never" className="capitalize cursor-pointer">Never</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="flex justify-end pt-2">
      <Button className="w-full sm:w-48 bg-blue-700 cursor-pointer hover:bg-blue-800 text-white h-10 md:h-11" type="submit">
        Update Preferences
      </Button>
    </div>
  </CardContent>
</Card>


      </section>
    </main>
  );
}