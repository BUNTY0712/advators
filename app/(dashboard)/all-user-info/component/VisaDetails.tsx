"use client";

import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronDown } from "lucide-react";
import {
  useGetDriverVisaDetailsQuery,
  useUpdateDriverVisaDetailsMutation,
} from "@/app/store/api/authApi";
import { toast } from "sonner";

const VisaDetails = ({ id }: any) => {
  console.log("Driver ID in VisaDetails:", id); // Debugging line to check if ID is received correctly
  // ✅ GET API
  const { data, isLoading } = useGetDriverVisaDetailsQuery(id);



  // ✅ UPDATE API
  const [updateVisa, { isLoading: isUpdating }] =
    useUpdateDriverVisaDetailsMutation();

  // ✅ STATE
  const [form, setForm] = useState({
    visa_status: "",
    visa_expiry_date: "",
  });

  // ✅ AUTO FILL
  useEffect(() => {
    if (data?.data?.length > 0) {
      console.log("data", data);
      const visa = data.data[0];

      setForm({
        visa_status: visa.visa_status || "",
        visa_expiry_date: visa.visa_expiry_date || "",
      });
    }
  }, [data]);

  // ✅ HANDLE CHANGE
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ SAVE HANDLER
const handleSave = async () => {
  if (!form.visa_status || !form.visa_expiry_date) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    await updateVisa({
      id,
      visa_status: form.visa_status,
      visa_expiry_date: form.visa_expiry_date,
    }).unwrap();

    toast.success("Visa updated successfully ✅");
  } catch (err: any) {
    const apiError = err?.data;

    if (apiError?.errors) {
      // Show each validation error as separate toast
      Object.values(apiError.errors).forEach((fieldErrors: any) => {
        fieldErrors.forEach((msg: string) => {
          toast.error(msg);
        });
      });
    } else {
      toast.error(
        apiError?.message ||
        apiError?.error ||
        err?.message ||
        "Something went wrong ❌"
      );
    }
  }
};

  return (
    <div className="bg-white max-w-4xl">
      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
          Visa Details
        </h2>
      </div>

      {/* Loader */}
      {isLoading && <p>Loading...</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Visa Status */}
        <div className="space-y-1.5">
          <Label>Visa Status</Label>
          <div className="relative">
            <select
              value={form.visa_status}
              onChange={(e) =>
                handleChange("visa_status", e.target.value)
              }
              className="w-full border rounded-md h-10 px-3 pr-10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>

              {/* <option value="Expired">Expired</option>
              <option value="Pending">Pending</option> */}
            </select>

            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Visa Expiry Date */}
        <div className="space-y-1.5">
          <Label>Visa Expiry Date</Label>
          <div className="relative">
            <Input
              type="date"
              value={form.visa_expiry_date}
              onChange={(e) =>
                handleChange("visa_expiry_date", e.target.value)
              }
            />
            {/* <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" /> */}
          </div>
        </div>
      </div>

      {/* ✅ ACTION BUTTON */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition ${
            isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[linear-gradient(135deg,#0ea5d4,#1e3a5f)] hover:opacity-90"
          }`}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
          {/* <span>→</span> */}
        </button>
      </div>
    </div>
  );
};

export default VisaDetails;