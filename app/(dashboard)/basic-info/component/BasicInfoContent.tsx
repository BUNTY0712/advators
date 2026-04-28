"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useSearchParams } from "next/navigation";

import MaritalStatus from "./MaritalStatus";
import LicenseDetails from "./LicenseComponent/CountryDetails";
import StateDetails from "./StateComponent/StateDetails";
import VisaDetails from "../../all-user-info/component/VisaDetails";
import VisaDetailsTab from "./VisaComponent/VisaDetailsTab";
import CountryDetails from "./LicenseComponent/CountryDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "10" },
  ];
}

const TABS = [
  "Marital Status",
  "State Details",
  "Country Details",
  "Visa Status",

];

export default async function BasicInfoContent() {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");

  // if (!id) {
  //   return <div className="p-6 text-red-500">Invalid Driver ID</div>;
  // }

  return (
    <div className="p-0">
      {/* Header */}
      <div className="mb-6">
        <div className="relative pl-3">
          <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded"></span>
          <p className="text-xl font-semibold text-gray-800">
            Basic Information 
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={TABS[0]} className="w-full">
        <TabsList className="flex flex-wrap gap-1 p-1.5 rounded-xl  ">
    {TABS.map((tab) => (
<TabsTrigger
  key={tab}
  value={tab}
  className="
    px-3 py-4 rounded-lg text-sm font-medium transition-all duration-200
    text-black hover:text-gray-700
    bg-white/80 hover:bg-white/90
    border border-gray-200

    data-[state=active]:text-white
    data-[state=active]:shadow-md
    data-[state=active]:font-semibold
    data-[state=active]:bg-[linear-gradient(135deg,#0ea5d4,#1e3a5f)]
    cursor-pointer
  "
>
  {tab}
</TabsTrigger>
))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab} value={tab} className="bg-white mt-5 max-w-4xl p-5 border rounded-md shadow-sm">
            {tab === "Marital Status" && <MaritalStatus  />}
            {tab === "State Details" && <StateDetails/>}
            {tab === "Country Details" && <CountryDetails />}
            {tab === "Visa Status" && <VisaDetailsTab  />}

         

          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}