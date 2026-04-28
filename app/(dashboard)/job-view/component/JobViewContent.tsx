"use client";
import { useGetJobViewQuery } from "@/app/store/api/authApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const JobViewContent = () => {
  const searchParams = useSearchParams();
const jobId = Number(searchParams.get("jobId"))
  const { data, isLoading, error } = useGetJobViewQuery(jobId);

  if (isLoading) return <p className="p-8 text-gray-500 animate-pulse">Loading job details...</p>;
  if (error) return <p className="p-8 text-red-500 font-medium">Error loading job details</p>;

  const job = data?.data;
  const docUrl = data?.doc_url;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* MAIN WRAPPER CARD */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
        
        {/* ✅ HEADER SECTION */}
        <div className="bg-gray-50/50 border-b px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
            <p className="text-sm text-gray-500 mt-1">Reference ID: <span className="font-mono text-blue-600">{job?.id}</span></p>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100">
            {job?.load_type || "Active"}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* ✅ GRID: BASIC DETAILS */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Core Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50/80 p-6 rounded-xl border border-gray-100">
              <Info label="Client ID" value={job?.client_id} />
              <Info label="Trip Type" value={job?.trip_type} />
              <Info label="Truck Unit" value={job?.truck_id} />
              <Info label="Trailer A" value={job?.trailer_id} />
              <Info label="Trailer B" value={job?.trailer_b} />
              <Info label="Load Category" value={job?.load_type} />
            </div>
          </section>

          {/* ✅ NOTES */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Dispatcher Notes</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-gray-700">
              {job?.notes || "No additional notes provided for this job."}
            </div>
          </section>

          {/* ✅ STOPS */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Route & Stops</h3>
            {job?.stops?.length === 0 ? (
              <p className="text-gray-400 italic">No stops recorded.</p>
            ) : (
              <div className="space-y-4">
                {job?.stops?.map((stop: any, index: number) => (
                  <div
                    key={stop.id}
                    className="group border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:justify-between gap-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Left Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-blue-500 transition-colors" />
                    
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 capitalize flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        {stop.type}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="font-medium">Date:</span> {stop.date}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="font-medium">Window:</span> {stop.ready_time} — {stop.close_time}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-600 border border-gray-100 min-w-[140px]">
                      <p><span className="text-gray-400">Pallet:</span> {stop.pallet_type}</p>
                      <p><span className="text-gray-400">Qty:</span> {stop.pallet_qty || "-"}</p>
                    </div>

                    <div className="flex-1 text-sm text-gray-500 bg-blue-50/30 p-3 rounded-lg border border-blue-50">
                      <span className="block text-[10px] uppercase font-bold text-blue-400 mb-1">Stop Instructions</span>
                      {stop.stop_notes || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ✅ DOCUMENTS */}
          <section>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Attached Documents</h3>
            {job?.documents?.length === 0 ? (
              <p className="text-gray-400 italic">No attachments available.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {job?.documents?.map((doc: any) => (
                  <a
                    key={doc.id}
                    href={`${docUrl}/${doc.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-blue-400 transition-all duration-200"
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-3">
                      <img
                        src={`${docUrl}/${doc.file_path}`}
                        alt={doc.document_name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-700 truncate text-center px-1">
                      {doc.document_name}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobViewContent;

// ✅ REUSABLE INFO COMPONENT
const Info = ({ label, value }: { label: string; value: any }) => (
  <div className="space-y-1">
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
  </div>
);