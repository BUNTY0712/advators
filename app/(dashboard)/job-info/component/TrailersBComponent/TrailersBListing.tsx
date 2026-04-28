"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { id: 1, name: "Flatbed Trailer B" },
  { id: 2, name: "Container Trailer B" },
  { id: 3, name: "Lowboy Trailer B" },
];

const TrailersBListing = () => {
  return (
    <div className="p-4">
      <Card className="w-full shadow-md rounded-2xl">
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Trailer B List
          </CardTitle>

          {/* Optional Add Button */}
          {/* <Button className="bg-black text-white hover:bg-gray-800">
            + Add Trailer B
          </Button> */}
        </CardHeader>

        {/* Table */}
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-2 font-medium">#</th>
                  <th className="py-3 px-2 font-medium">Trailer B Name</th>
                  <th className="py-3 px-2 font-medium text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2">{item.name}</td>

                    <td className="py-3 px-2 text-right space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No data found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrailersBListing;