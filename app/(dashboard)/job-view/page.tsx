import JobViewContent from "./component/JobViewContent"
export const metadata = {
  title: "vrm-job-view",
};
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <JobViewContent />
    </Suspense>
  );
}