"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import {
  useGetDriverContactDetailsQuery,
  useUpdateDriverContactDetailsMutation,
} from "@/app/store/api/authApi";
import { toast } from "sonner";

const ContractDetails = ({ id }: any) => {
  // ✅ GET API
  const { data, isLoading } = useGetDriverContactDetailsQuery(id);

  // ✅ UPDATE API
  const [updateContact, { isLoading: isUpdating }] =
    useUpdateDriverContactDetailsMutation();

  // ✅ STATE
  const [form, setForm] = useState({
    contact_type: "",
    pan_type: "",
    commencement_date: "",
  });

  // ✅ AUTO FILL
  useEffect(() => {
    if (data?.data?.length > 0) {
      const contact = data.data[0];

      setForm({
        contact_type: contact.contact_type || "",
        pan_type: contact.pan_type || "",
        commencement_date: contact.commencement_date || "",
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



const handleSave = async () => {
  if (!form.contact_type || !form.pan_type || !form.commencement_date) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    await updateContact({
      id,
      contact_type: form.contact_type,
      pan_type: form.pan_type,
      commencement_date: form.commencement_date,
    }).unwrap();

    toast.success("Contact details updated ✅");
  } catch (err: any) {
    const apiError = err?.data;

    if (apiError?.errors) {
      // Show each validation error
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
          Contract Details
        </h2>
      </div>

      {/* Loader */}
      {isLoading && <p>Loading...</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Contract Type */}
        <div className="space-y-1.5">
          <Label>Contract Type</Label>
          <Input
            value={form.contact_type}
            onChange={(e) =>
              handleChange("contact_type", e.target.value)
            }
            placeholder="Enter contract type"
          />
        </div>

        {/* PAN Type */}
        <div className="space-y-1.5">
          <Label>PAN Type</Label>
          <Input
            value={form.pan_type}
            onChange={(e) =>
              handleChange("pan_type", e.target.value)
            }
            placeholder="Enter PAN type"
          />
        </div>

        {/* Commencement Date */}
        <div className="space-y-1.5">
          <Label>Commencement Date</Label>
          <div className="relative">
            <Input
              type="date"
              value={form.commencement_date}
              onChange={(e) =>
                handleChange("commencement_date", e.target.value)
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

export default ContractDetails;