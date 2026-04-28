"use client";

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Calendar } from "lucide-react"
import { useGetDriverProfileQuery, useGetStatesQuery, useUpdateDriverProfileMutation } from "@/app/store/api/authApi";
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner";

const BasicDetails = ({ id }: any) => {
const [date, setDate] = useState<Date | undefined>()
  const { data, isLoading } = useGetDriverProfileQuery(id)
  const [updateDriverProfile, { isLoading: updating }] = useUpdateDriverProfileMutation()
  const { data: stateData } = useGetStatesQuery(0) // country_id = 1
  

  // ✅ form state
  const [form, setForm] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    dob: "",
    marital_status: "",
    street: "",
    suburb: "",
    state: "",
    post_code: "",
  })

  // ✅ fill data when API comes
useEffect(() => {
  if (data?.diver) {
    const d = data.diver

    setForm({
      id: d.id || "",
      name: d.name || "",
      mobile: d.mobile || "",
      email: d.email || "",
      dob: d.dob || "",
      marital_status: d.marital_status || "",
      street: d.street || "",
      suburb: d.suburb || "",
      state: d.state || "",
      post_code: d.post_code || "",
    })

    // ✅ IMPORTANT: set calendar date
    if (d.dob) {
      setDate(new Date(d.dob)) // 👈 THIS LINE FIXES YOUR ISSUE
    }
  }
}, [data])

  // ✅ handle change
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
const handleSubmit = async () => {
  try {
    const res = await updateDriverProfile({
      id: Number(form.id),
      name: form.name,
      dob: form.dob,
      marital_status: form.marital_status,
      street: form.street,
      suburb: form.suburb,
      country: "India",
      state: form.state,
      post_code: form.post_code,
    }).unwrap();

    console.log("Updated:", res);

    toast.success(res?.message || "Profile updated successfully ✅");

  } catch (err: any) {
    console.error("Update error:", err);

    toast.error(
      err?.data?.message ||
      err?.data?.error ||
      err?.message ||
      "Update failed ❌"
    );
  }
};

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="bg-white max-w-4xl">

      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
          Basic Details
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Driver ID */}
        <div className="space-y-1.5">
          <Label>Driver ID</Label>
          <Input
            name="id"
            value={form.id}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label>Phone Number</Label>
          <Input
          disabled
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label>Email Address</Label>
          <Input
          disabled
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* DOB */}

<div className="space-y-1.5">
  <Label>Date of Birth</Label>

  <Popover>
    <PopoverTrigger asChild>
      <button
        className="w-full border rounded-md h-10 px-3 flex items-center justify-between"
      >
      {date ? format(date, "dd-MM-yyyy") : form.dob || "Pick a date"}
        <CalendarIcon className="h-4 w-4 opacity-50" />
      </button>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => {
          setDate(d)
          setForm((prev) => ({
            ...prev,
            dob: d ? format(d, "yyyy-MM-dd") : "",
          }))
        }}
      />
    </PopoverContent>
  </Popover>
</div>

        {/* Marital Status */}
        <div className="space-y-1.5">
          <Label>Marital Status</Label>
          <select
            name="marital_status"
            value={form.marital_status}
            onChange={handleChange}
            className="w-full border rounded-md h-10 px-3"
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Street */}
        <div className="space-y-1.5 md:col-span-2">
          <Label>Street</Label>
          <Input
            name="street"
            value={form.street}
            onChange={handleChange}
          />
        </div>

        {/* Suburb */}
        <div className="space-y-1.5">
          <Label>Suburb</Label>
          <Input
            name="suburb"
            value={form.suburb}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <Label>State</Label>
        <select
  name="state"
  value={form.state}
  onChange={handleChange}
  className="w-full border rounded-md h-10 px-3"
>
  <option value="">Select</option>

  {stateData?.data?.map((state: any) => (
    <option key={state.id} value={state.id}>
      {state.name}
    </option>
  ))}
</select>
        </div>

        {/* Post Code */}
        <div className="space-y-1.5">
          <Label>Post Code</Label>
          <Input
            name="post_code"
            value={form.post_code}
            onChange={handleChange}
          />
        </div>

      </div>
      <div className="mt-6">
  <button
    onClick={handleSubmit}
    className="bg-[linear-gradient(135deg,#0ea5d4,#1e3a5f)] text-white px-6 py-2 rounded-md"
  >
    {updating ? "Updating..." : "Save Changes"}
  </button>
</div>
    </div>
  )
}

export default BasicDetails