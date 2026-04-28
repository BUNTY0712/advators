"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCountryCreateMutation } from "@/app/store/api/authApi"
import { toast } from "sonner"
const AddCountryForm = () => {
  const [name, setName] = useState("")
  const [createCountry, { isLoading }] = useCountryCreateMutation()



const handleSubmit = async () => {
  if (!name.trim()) {
    toast.warning("Please enter country name ⚠️")
    return
  }

  try {
    const promise = createCountry({ name }).unwrap()

    await toast.promise(promise, {
      loading: "Creating country...",
      success: "Country created successfully ✅",
      error: "Failed to create country ❌",
    })

    setName("")
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="flex justify-center items-center bg-gray-50 p-0">
      <Card className="w-full max-w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Add Country
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Input */}
          <div className="space-y-2">
            <Label>Country Name</Label>
            <Input
              placeholder="Enter country name (e.g. India, USA)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default AddCountryForm