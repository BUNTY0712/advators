"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AddStateForm = () => {
  return (
    <div className="flex justify-center items-center bg-gray-50 p-0">
      <Card className="w-full max-w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Add State
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* State Input */}
          <div className="space-y-2">
            <Label>State Name</Label>
            <Input placeholder="Enter state name (e.g. West Bengal, California)" />
          </div>

          {/* Button */}
          <div className="flex justify-end pt-2">
            <Button className="bg-black text-white hover:bg-gray-800">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddStateForm