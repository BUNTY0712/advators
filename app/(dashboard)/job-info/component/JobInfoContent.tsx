"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useSearchParams } from "next/navigation";
import ClientDetail from "./ClientComponent/ClientDetail";
import TripTypeDetails from "./TripTypeComponent/TripTypeDetails";
import TruckDetails from "./TrucksComponent/TruckDetails";
import TrailersADetail from "./TrailersAComponent/TrailersADetail";
import TrailersBDetail from "./TrailersBComponent/TrailersBDetail";
import LoadTypeDetail from "./LoadTypeComponent/LoadTypeDetail";
import LocationDetail from "./LocationComponent/LocationDetail";
import CityDetail from "./CityComponent/CityDetail";
import SuburbDetail from "./SuburbComponent/SuburbDetail";
import PalletDetail from "./PalletComponent/PalletDetail";





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
  "Client Type",
  "Trip Type",
  "Truck Type",
  "Trailers A Type",
  "Trailers B Type",
  "Load Type",
  "Location Type",
  "City Type",
  "Suburb Type",
  "Pallet Type",










];

export default async function JobInfoContent() {
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
            Job Information 
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={TABS[0]} className="w-full">
        <TabsList className="grid grid-cols-7 gap-2 p-1.5 rounded-xl">
    {TABS.map((tab) => (
<TabsTrigger
  key={tab}
  value={tab}
  className="
    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
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
          <TabsContent key={tab} value={tab} className="bg-white mt-15 max-w-4xl p-0 border rounded-md shadow-sm">
            {tab === "Client Type" && <ClientDetail  />}
            {tab === "Trip Type" && <TripTypeDetails  />}
            {tab === "Truck Type" && <TruckDetails  />}
            {tab === "Trailers A Type" && <TrailersADetail  />}
            {tab === "Trailers B Type" && <TrailersBDetail  />}
            {tab === "Load Type" && <LoadTypeDetail  />}
            {tab === "Location Type" && <LocationDetail  />}
            {tab === "City Type" && <CityDetail  />}
            {tab === "Suburb Type" && <SuburbDetail  />}
            {tab === "Pallet Type" && <PalletDetail  />}



          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}