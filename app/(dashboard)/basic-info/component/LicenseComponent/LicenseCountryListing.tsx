"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCountryListQuery, useCountryDeleteMutation } from "@/app/store/api/authApi"

const LicenseCountryListing = () => {
  const { data, isLoading } = useCountryListQuery()
  const [deleteCountry, { isLoading: deleting }] = useCountryDeleteMutation()

  const countries = data?.data || []

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this country?")
    if (!confirmDelete) return

    try {
      await deleteCountry(id).unwrap()
      alert("Deleted successfully ✅")
    } catch (error) {
      console.error(error)
      alert("Delete failed ❌")
    }
  }

  return (
    <div className="p-4">
      <Card className="w-full shadow-md rounded-2xl">
        
        <CardHeader>
          <CardTitle>License Country List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Country</th>
                  <th className="py-3 px-2">ISO</th>
                  <th className="py-3 px-2">Phone</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : countries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      No data found
                    </td>
                  </tr>
                ) : (
                  countries.map((item: any, index: number) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      
                      <td className="py-3 px-2">{index + 1}</td>
                      <td className="py-3 px-2 font-medium">{item.name}</td>
                      <td className="py-3 px-2">{item.iso_code || "-"}</td>
                      <td className="py-3 px-2">{item.phone_code || "-"}</td>

                      <td className="py-3 px-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === "1"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.status === "1" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleting}
                        >
                          Delete
                        </Button>
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

export default LicenseCountryListing