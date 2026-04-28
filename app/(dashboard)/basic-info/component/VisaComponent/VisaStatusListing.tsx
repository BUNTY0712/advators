"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  
  useVisaStatusListQuery,
  useVisaStatusDeleteMutation,
  useVisaStatusUpdateMutation, // ✅ UPDATE API
} from "@/app/store/api/additionalInfoApi"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

const VisaStatusListing = () => {
  const { data, isLoading } = useVisaStatusListQuery()
  const [deleteVisa, { isLoading: deleting }] = useVisaStatusDeleteMutation()
  const [updateVisa, { isLoading: updating }] = useVisaStatusUpdateMutation()

  const [editId, setEditId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const list = data?.data || []

  // 🔥 DELETE
  const handleDelete = (id: number) => {
    toast("Are you sure you want to delete this?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const promise = deleteVisa(id).unwrap()

            await toast.promise(promise, {
              loading: "Deleting...",
              success: "Deleted successfully ✅",
              error: "Delete failed ❌",
            })
          } catch (err) {
            console.error(err)
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    })
  }

  // 🔥 EDIT CLICK
  const handleEdit = (item: any) => {
    setEditId(item.id)
    setEditValue(item.name)
  }

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (!editId) {
      toast.error("Invalid ID")
      return
    }

    if (!editValue.trim()) {
      toast.error("Enter value")
      return
    }

    try {
      const promise = updateVisa({
        id: editId,
        name: editValue,
      }).unwrap()

      await toast.promise(promise, {
        loading: "Updating...",
        success: "Updated successfully ✅",
        error: "Update failed ❌",
      })

      setEditId(null)
      setEditValue("")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <Card className="w-full shadow-md rounded-2xl">
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Visa Status List
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Visa Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6">
                      No data found
                    </td>
                  </tr>
                ) : (
                  list.map((item: any, index: number) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      
                      {/* INDEX */}
                      <td className="py-3 px-2">{index + 1}</td>

                      {/* INLINE EDIT */}
                      <td className="py-3 px-2 font-medium">
                        {editId === item.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          item.name
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3 px-2 text-right space-x-2">
                        
                        {editId === item.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleUpdate}
                              disabled={updating}
                            >
                              {updating ? "Updating..." : "Update"}
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(item.id)}
                              disabled={deleting}
                            >
                              Delete
                            </Button>
                          </>
                        )}

                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VisaStatusListing