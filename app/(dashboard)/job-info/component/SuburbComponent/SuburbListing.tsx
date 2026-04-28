"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { id: 1, name: "Kolkata" },
  { id: 2, name: "Mumbai" },
  { id: 3, name: "Delhi" },
];

const SuburbListing = () => {
  return (
    <div className="p-4">
      <Card className="w-full shadow-md rounded-2xl">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            City List
          </CardTitle>

          {/* Add Button */}
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
            + Add City
          </Button>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 px-3 w-[60px]">#</th>
                  <th className="py-2 px-3">City Name</th>
                  <th className="py-2 px-3 w-[160px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-3">{index + 1}</td>
                      <td className="py-3 px-3 font-medium">
                        {item.name}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="text-center py-6 text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuburbListing;