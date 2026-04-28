"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMaritalStatusCreateMutation } from "@/app/store/api/additionalInfoApi"
import { toast } from "sonner"

const AddMaritalForm = () => {
  const [name, setName] = useState("")
  const [createStatus, { isLoading }] = useMaritalStatusCreateMutation()


const handleSubmit = async () => {
  if (!name.trim()) {
    toast.warning("Please enter marital status ⚠️")
    return
  }

  try {
    const promise = createStatus({ name }).unwrap()

    await toast.promise(promise, {
      loading: "Saving marital status...",
      success: "Marital status saved ✅",
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
            Add Marital Status
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Input */}
          <div className="space-y-2">
            <Label>Marital Status</Label>
            <Input
              placeholder="Enter marital status (e.g. Single, Married)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="flex justify-end gap-3 pt-2">
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

export default AddMaritalForm