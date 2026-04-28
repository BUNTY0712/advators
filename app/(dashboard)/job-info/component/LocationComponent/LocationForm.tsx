"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LocationForm = () => {
  return (
    <div className="p-4">
      <Card className="w-full rounded-2xl shadow-sm border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Add Location
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Location Name Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location Name</Label>
            <Input
              placeholder="Enter location name"
              className="h-10"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Button className="bg-black text-white hover:bg-gray-800 px-6">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationForm;