"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetDriverAccountDetailsQuery,
  useUpdateDriverAccountDetailsMutation,
} from "@/app/store/api/authApi";
import { toast } from "sonner";

type AccountForm = {
  abn: string;
  bank_name: string;
  bsb_number: string;
  account_number: string;
};

const AccountDetails = ({ id }: any) => {
  const { data, isLoading } = useGetDriverAccountDetailsQuery(id);
  const [updateAccount, { isLoading: isUpdating }] =
    useUpdateDriverAccountDetailsMutation();

  const [form, setForm] = useState<AccountForm>({
    abn: "",
    bank_name: "",
    bsb_number: "",
    account_number: "",
  });

  // ✅ PREFILL DATA (ARRAY FIX)
  useEffect(() => {
    if (data?.data?.length > 0) {
      const acc = data.data[0];

      setForm({
        abn: acc.abn || "",
        bank_name: acc.bank_name || "",
        bsb_number: acc.bsb_number || "",
        account_number: acc.account_number || "",
      });
    }
  }, [data]);

  // ✅ HANDLE CHANGE
  const handleChange = (key: keyof AccountForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ SAVE FUNCTION
  const handleSave = async () => {
    try {
      const res = await updateAccount({
        id: id,
        abn: form.abn,
        bank_name: form.bank_name,
        bsb_number: form.bsb_number,
        account_number: form.account_number,
      }).unwrap();

      if (res?.status) {
        toast.success(res.message || "Account updated successfully");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error: any) {
  const apiError = error?.data;

  if (apiError?.errors) {
    // Loop through all validation errors
    Object.values(apiError.errors).forEach((fieldErrors: any) => {
      fieldErrors.forEach((msg: string) => {
        toast.error(msg);
      });
    });
  } else {
    toast.error(
      apiError?.message ||
      apiError?.error ||
      error?.message ||
      "Something went wrong"
    );
  }
}
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white max-w-4xl">

      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-5 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></div>
        <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
          Account Details
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ABN */}
        <div className="space-y-1.5">
          <Label>ABN</Label>
          <Input
            type="number"
            placeholder="Enter ABN"
            value={form.abn}
            onChange={(e) => handleChange("abn", e.target.value)}
          />
        </div>

        {/* Bank Name */}
        <div className="space-y-1.5">
          <Label>Bank Name</Label>
          <Input
            placeholder="Enter bank name"
            value={form.bank_name}
            onChange={(e) => handleChange("bank_name", e.target.value)}
          />
        </div>

        {/* BSB Number */}
        <div className="space-y-1.5">
          <Label>BSB Number</Label>
          <Input
            type="number"
            placeholder="Enter BSB number"
            value={form.bsb_number}
            onChange={(e) => handleChange("bsb_number", e.target.value)}
          />
        </div>

        {/* Account Number */}
        <div className="space-y-1.5">
          <Label>Account Number</Label>
          <Input
            type="text"
            placeholder="Enter account number"
            value={form.account_number}
            onChange={(e) =>
              handleChange("account_number", e.target.value)
            }
          />
        </div>

      </div>

      {/* ✅ SAVE BUTTON */}
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

export default AccountDetails;