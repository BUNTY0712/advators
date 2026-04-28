"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useVisaStatusCreateMutation } from "@/app/store/api/additionalInfoApi"
import { toast } from "sonner"

const AddVisaStatusForm = () => {
    const [name, setName] = useState("")
    const [createStatus, { isLoading }] = useVisaStatusCreateMutation()

    const handleSubmit = async () => {
  if (!name.trim()) {
    toast.warning("Please enter visa status ⚠️")
    return
  }

  try {
    const promise = createStatus({ name }).unwrap()

    await toast.promise(promise, {
      loading: "Saving visa status...",
      success: "Visa status saved ✅",
      error: "Failed to save ❌",
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
            Add Visa Status
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Visa Status Input */}
          <div className="space-y-2">
            <Label>Visa Status</Label>
            <Input  value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Enter visa status (e.g. Tourist, Student, Work Permit)" />
          </div>

          {/* Button */}
          <div className="flex justify-end pt-2">
            <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddVisaStatusForm