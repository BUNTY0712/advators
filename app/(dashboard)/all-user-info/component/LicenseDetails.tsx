"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useGetDriverLicenseDetailsQuery,
  useUpdateDriverLicenseMutation,
} from "@/app/store/api/authApi";
import { toast } from "sonner";

type LicenseForm = {
  license_country: string;
  license_number: string;
  license_state: string;
  issue_date: string;
  expiry_date: string;
};

const LicenseDetails = ({ id }: any) => {
  const [issueDate, setIssueDate] = useState<Date | undefined>();
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const { data, isLoading } = useGetDriverLicenseDetailsQuery(id);
  const [updateLicense, { isLoading: isUpdating }] =
    useUpdateDriverLicenseMutation();

  const [form, setForm] = useState<LicenseForm>({
    license_country: "",
    license_number: "",
    license_state: "",
    issue_date: "",
    expiry_date: "",
  });

  // ✅ PREFILL DATA
  useEffect(() => {
    if (data?.data?.length > 0) {
      const license = data.data[0];

      setForm({
        license_country: String(license.license_country || ""),
        license_number: license.license_number || "",
        license_state: String(license.license_state || ""),
        issue_date: license.issue_date || "",
        expiry_date: license.expiry_date || "",
      });

      // ✅ convert string → Date
      if (license.issue_date) {
        setIssueDate(new Date(license.issue_date));
      }

      if (license.expiry_date) {
        setExpiryDate(new Date(license.expiry_date));
      }
    }
  }, [data]);

  // ✅ HANDLE CHANGE
  const handleChange = (key: keyof LicenseForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ SAVE
  const handleSave = async () => {
    try {
      const res = await updateLicense({
        id: id,
        license_country: Number(form.license_country),
        license_number: form.license_number,
        license_state: Number(form.license_state),
        issue_date: form.issue_date,
        expiry_date: form.expiry_date,
      }).unwrap();

      if (res?.status) {
        toast.success(res.message || "License updated successfully");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error: any) {
  
    toast.error(
      // error?.data?.message ||
      error?.data?.error ||
      error?.message ||
      "Something went wrong"
    );
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white max-w-4xl">

      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
        <h2 className="text-lg font-semibold text-gray-900">
          License Details
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* License Country */}
        <div className="space-y-1.5">
          <Label>License Country</Label>
          <select
            className="w-full border rounded-md h-10 px-3"
            value={form.license_country}
            onChange={(e) =>
              handleChange("license_country", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="1">India</option>
            <option value="2">Australia</option>
            <option value="3">USA</option>
          </select>
        </div>

        {/* ✅ License Number (FIXED) */}
        <div className="space-y-1.5">
          <Label>License Number</Label>
          <Input
            value={form.license_number}
            onChange={(e) =>
              handleChange("license_number", e.target.value)
            }
            placeholder="Enter license number"
          />
        </div>

        {/* License State */}
        <div className="space-y-1.5">
          <Label>License State</Label>
          <select
            className="w-full border rounded-md h-10 px-3"
            value={form.license_state}
            onChange={(e) =>
              handleChange("license_state", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="1">West Bengal</option>
            <option value="2">Delhi</option>
          </select>
        </div>

        {/* ✅ Issue Date */}
        <div className="space-y-1.5">
          <Label>License Issue Date</Label>

          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full border rounded-md h-10 px-3 flex items-center justify-between">
                {issueDate
                  ? format(issueDate, "dd-MM-yyyy")
                  : "Pick a date"}
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={issueDate}
                onSelect={(d) => {
                  setIssueDate(d);
                  handleChange(
                    "issue_date",
                    d ? format(d, "yyyy-MM-dd") : ""
                  );
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* ✅ Expiry Date */}
        <div className="space-y-1.5">
          <Label>License Expiry Date</Label>

          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full border rounded-md h-10 px-3 flex items-center justify-between">
                {expiryDate
                  ? format(expiryDate, "dd-MM-yyyy")
                  : "Pick a date"}
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={expiryDate}
                onSelect={(d) => {
                  // ✅ validation (optional)
                  if (d && issueDate && d < issueDate) {
                    toast.error("Expiry must be after issue date");
                    return;
                  }

                  setExpiryDate(d);
                  handleChange(
                    "expiry_date",
                    d ? format(d, "yyyy-MM-dd") : ""
                  );
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-[linear-gradient(135deg,#0ea5d4,#1e3a5f)] text-white px-6 py-2 rounded-md"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default LicenseDetails;