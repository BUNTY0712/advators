import { Suspense } from "react";


import JobInfoContent from "./component/JobInfoContent";
export const metadata = {
  title: "vrm-job-info ",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <JobInfoContent />
    </Suspense>
  );
}