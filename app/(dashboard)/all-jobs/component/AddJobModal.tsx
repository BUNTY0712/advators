"use client";

import { useState } from "react";
import {
  Plus, FileText, MapPin, Info, MessageSquare,
  Truck, CheckCircle, Upload, X, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCreateJobMutation } from "@/app/store/api/authApi";

// ─── Types ──────────────────────────────────────────────────────────────────

type Stop = {
  type: "pickup" | "dropoff";
  location_id: string;
  city_id: string;
  suburb_id: string;
  date: string;
  ready_time: string;
  close_time: string;
  pallet_type: string;
  pallet_qty: string;
  stop_notes: string; // ✅ FIXED
};

type Doc = { file: File | null; name: string };

type Tab = "general" | "stops" | "documents" | "notes";

// ─── Component ──────────────────────────────────────────────────────────────

export function AddJobModal() {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [activeTab, setActiveTab] = useState<Tab>("general");
   const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    client_id: "",
    trip_type: "",
    truck_id: "",
    trailer_id: "",
    trailer_b: "",
    load_type: "",
    notes: "",
  });

 const [stops, setStops] = useState<Stop[]>([
  {
    type: "pickup",
    location_id: "",
    city_id: "",
    suburb_id: "",
    date: "",
    ready_time: "",
    close_time: "",
    pallet_type: "",
    pallet_qty: "",
    stop_notes: "", // ✅ FIXED
  },
]);

  const [documents, setDocuments] = useState<Doc[]>([{ file: null, name: "" }]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleStopChange = (index: number, name: string, value: string) => {
    setStops((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

const addStop = () =>
  setStops((prev) => [
    ...prev,
    {
      type: "dropoff",
      location_id: "",
      city_id: "",
      suburb_id: "",
      date: "",
      ready_time: "",
      close_time: "",
      pallet_type: "",
      pallet_qty: "",
      stop_notes: "", // ✅ FIXED
    },
  ]);

  const removeStop = (index: number) =>
    setStops((prev) => prev.filter((_, i) => i !== index));

  const handleDocChange = (index: number, field: keyof Doc, value: any) => {
    setDocuments((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addDocument = () =>
    setDocuments((prev) => [...prev, { file: null, name: "" }]);

  const removeDocument = (index: number) =>
    setDocuments((prev) => prev.filter((_, i) => i !== index));

  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
  //     stops.forEach((stop, i) =>
  //       Object.entries(stop).forEach(([key, value]) =>
  //         formData.append(`stops[${i}][${key}]`, value)
  //       )
  //     );
  //     documents.forEach((doc, i) => {
  //       if (doc.file) {
  //         formData.append(`documents[${i}]`, doc.file);
  //         formData.append(`document_names[${i}]`, doc.name);
  //       }
  //     });
  //     await createJob(formData).unwrap();
  //     alert("Job created ✅");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error creating job ❌");
  //   }
  // };

 const handleSubmit = async () => {
  try {
    const formData = new FormData();

    // ✅ Append all fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });

    // ✅ FORCE notes (fix backend error)
    formData.append("notes", form.notes ?? "");

    // ✅ Stops with stop_notes
    stops.forEach((stop, i) => {
      Object.entries(stop).forEach(([key, value]) => {
        formData.append(`stops[${i}][${key}]`, value ?? "");
      });
    });

    // ✅ Documents
    documents.forEach((doc, i) => {
      if (doc.file) {
        formData.append(`documents[${i}]`, doc.file);
        formData.append(`document_names[${i}]`, doc.name);
      }
    });

    await createJob(formData).unwrap();

    alert("Job created ✅");

    // ✅ Reset form (nice UX)
    setForm({
      client_id: "",
      trip_type: "",
      truck_id: "",
      trailer_id: "",
      trailer_b: "",
      load_type: "",
      notes: "",
    });

    setStops([
      {
        type: "pickup",
        location_id: "",
        city_id: "",
        suburb_id: "",
        date: "",
        ready_time: "",
        close_time: "",
        pallet_type: "",
        pallet_qty: "",
        stop_notes: "",
      },
    ]);

    setDocuments([{ file: null, name: "" }]);

    // ✅ Close modal
    setOpen(false);

  } catch (err) {
    console.error(err);
    alert("Error creating job ❌");
  }
};

  // ─── Tabs config ────────────────────────────────────────────────────────────

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "general", label: "General Info", icon: <Info className="w-3.5 h-3.5" /> },
    { id: "stops", label: "Stops", icon: <MapPin className="w-3.5 h-3.5" />, badge: stops.length },
    { id: "documents", label: "Documents", icon: <FileText className="w-3.5 h-3.5" />, badge: documents.length },
    { id: "notes", label: "Notes", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ];

  // ─── UI ────────────────────────────────────────────────────────────────────

  return (
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white gap-1.5">
          <Plus className="w-4 h-4" /> Add Job
        </Button>
      </DialogTrigger>

      {/* FIXED: Added flex-col and max-h-screen logic */}
     <DialogContent className="!max-w-[1400px] w-[80vw] p-0 gap-0 overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
        
        {/* Header - flex-none ensures it doesn't shrink */}
        <div className="flex-none flex items-center justify-between px-6 py-4 bg-muted/40 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <DialogTitle className="text-sm font-medium leading-tight">Create New Job</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Fill in the details to create a transport job</p>
            </div>
          </div>
        </div>

        {/* Tabs - flex-none keeps it below header */}
        <div className="flex-none flex border-b bg-background px-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-3 text-xs border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600 font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full border ml-1",
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Body - flex-1 with overflow-y-auto makes THIS section scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6">

            {/* ── GENERAL ── */}
            {activeTab === "general" && (
              <div className="space-y-5">
                <Section label="Client & Assignment">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Client">
                      <Select onValueChange={(v) => handleChange("client_id", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select client" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">ABC Logistics</SelectItem>
                          <SelectItem value="2">Fast Freight Co</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Trip type">
                      <Select onValueChange={(v) => handleChange("trip_type", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local</SelectItem>
                          <SelectItem value="interstate">Interstate</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Load type">
                      <Select onValueChange={(v) => handleChange("load_type", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select load" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ftl">Full truck load</SelectItem>
                          <SelectItem value="ltl">Less than truckload</SelectItem>
                          <SelectItem value="reefer">Refrigerated</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </Section>

                <div className="border-t" />

                <Section label="Equipment">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Truck">
                      <Select onValueChange={(v) => handleChange("truck_id", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Assign truck" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">TRK-001 · Volvo FH</SelectItem>
                          <SelectItem value="2">TRK-002 · Mercedes Actros</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Trailer A">
                      <Select onValueChange={(v) => handleChange("trailer_id", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Assign trailer" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">TRL-011 · 13.6m</SelectItem>
                          <SelectItem value="2">TRL-012 · Curtainsider</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Trailer B (optional)">
                      <Select onValueChange={(v) => handleChange("trailer_b", v)}>
                        <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="None" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="1">TRL-021 · B-double</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </Section>
              </div>
            )}

            {/* ── STOPS ── */}
            {activeTab === "stops" && (
              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <div key={index}>
                    {index > 0 && (
                      <div className="flex items-center gap-2 my-1 ml-2.5">
                        <div className="w-px h-4 bg-border" />
                      </div>
                    )}
                    <div className="bg-muted/40 border rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium border",
                              stop.type === "pickup"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            )}
                          >
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">Stop {index + 1}</span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-medium border",
                              stop.type === "pickup"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            )}
                          >
                            {stop.type === "pickup" ? "Pickup" : "Drop-off"}
                          </span>
                        </div>
                        {index > 0 && (
                          <button
                            onClick={() => removeStop(index)}
                            className="text-[11px] px-2 py-1 rounded-md border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <Field label="Location">
                          <Select onValueChange={(v) => handleStopChange(index, "location_id", v)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select location" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Warehouse A</SelectItem>
                              <SelectItem value="2">Terminal B</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="City">
                          <Select onValueChange={(v) => handleStopChange(index, "city_id", v)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select city" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Sydney</SelectItem>
                              <SelectItem value="2">Melbourne</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Suburb">
                          <Select onValueChange={(v) => handleStopChange(index, "suburb_id", v)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select suburb" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Surry Hills</SelectItem>
                              <SelectItem value="2">Fitzroy</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
  <Field label="Date">
    <Input type="date" className="h-9 text-sm"
      onChange={(e) => handleStopChange(index, "date", e.target.value)}
    />
  </Field>

  <Field label="Ready time">
    <Input type="time" className="h-9 text-sm"
      onChange={(e) => handleStopChange(index, "ready_time", e.target.value)}
    />
  </Field>

  <Field label="Close time">
    <Input type="time" className="h-9 text-sm"
      onChange={(e) => handleStopChange(index, "close_time", e.target.value)}
    />
  </Field>

  <Field label="Pallet type">
    <Select onValueChange={(v) => handleStopChange(index, "pallet_type", v)}>
      <SelectTrigger className="h-9 text-sm">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="chep">CHEP</SelectItem>
        <SelectItem value="loscam">Loscam</SelectItem>
        <SelectItem value="plain">Plain</SelectItem>
      </SelectContent>
    </Select>
  </Field>
</div>

{/* ✅ MOVE HERE */}
<div className="mt-3">
  <Field label="Stop Notes">
    <Textarea
      className="text-sm resize-none"
      rows={2}
      placeholder="Enter stop instructions..."
      onChange={(e) =>
        handleStopChange(index, "stop_notes", e.target.value)
      }
    />
  </Field>
</div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addStop}
                  className="w-full py-2 border border-dashed rounded-lg text-xs text-muted-foreground hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add stop
                </button>
              </div>
            )}

            {/* ── DOCUMENTS ── */}
            {activeTab === "documents" && (
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3 bg-muted/40 border rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-background border flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex gap-3 flex-1 min-w-0">
                      <Field label="Document name" className="flex-1">
                        <Input
                          className="h-9 text-sm"
                          placeholder="e.g. Bill of lading"
                          value={doc.name}
                          onChange={(e) => handleDocChange(index, "name", e.target.value)}
                        />
                      </Field>
                      <Field label="File" className="flex-1">
                        <label className="flex items-center gap-2 h-9 px-3 border border-dashed rounded-md text-xs text-muted-foreground hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                          <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{doc.file ? doc.file.name : "Choose file"}</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleDocChange(index, "file", e.target.files?.[0] ?? null)}
                          />
                        </label>
                      </Field>
                    </div>
                    {index > 0 && (
                      <button
                        onClick={() => removeDocument(index)}
                        className="mt-6 text-[11px] px-2 py-1 rounded-md border text-muted-foreground hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex-shrink-0"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addDocument}
                  className="w-full py-2 border border-dashed rounded-lg text-xs text-muted-foreground hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add document
                </button>
              </div>
            )}

            {/* ── NOTES ── */}
            {activeTab === "notes" && (
              <div className="space-y-3">
                <Field label="Special instructions, delivery notes, or internal comments">
                  <Textarea
                    className="text-sm resize-none"
                    rows={6}
                    placeholder="e.g. Driver must call ahead 30 minutes before delivery. Forklift available on site..."
                    onChange={(e) => handleChange("notes", e.target.value)}
                  />
                </Field>
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  Notes are visible to dispatchers and assigned drivers.
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer - flex-none keeps it at the bottom */}
        <div className="flex-none flex items-center justify-between px-6 py-3.5 border-t bg-muted/40">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Ready to submit
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm" className="text-xs h-8">Cancel</Button>
            </DialogClose>
            <Button
              size="sm"
              className="text-xs h-8 bg-blue-600 hover:bg-blue-700 gap-1.5"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {isLoading ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mb-3">{label}</p>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-xs text-muted-foreground font-normal">{label}</Label>
      {children}
    </div>
  );
}