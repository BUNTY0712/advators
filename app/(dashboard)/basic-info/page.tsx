import { Suspense } from "react";

import BasicInfoContent from "./component/BasicInfoContent";
export const metadata = {
  title: "vrm-basic-info ",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <BasicInfoContent />
    </Suspense>
  );
}