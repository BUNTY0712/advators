import { Suspense } from "react";
import AllInfoContent from "./component/AllInfoContent";
export const metadata = {
  title: "vrm-all-user-info ",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AllInfoContent />
    </Suspense>
  );
}