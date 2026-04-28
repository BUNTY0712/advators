"use client"

import {
  Users,
  DollarSign,
  Megaphone,
  BarChart3,
} from "lucide-react"
import { FolderKanban, UserCog, Store } from "lucide-react";

import TopBar from "./TopBar"
import StatCard from "./StatCard"
import ActivityFeed from "./ActivityFeed"
import BarChart from "./BarChart"
import OrdersTable from "./OrdersTable"
import { useGetDashboardContentQuery } from "@/app/store/api/authApi";

export default function DashboardContent() {
  const { data, isLoading, error } = useGetDashboardContentQuery()

  // ✅ loader
  if (isLoading) return <p>Loading dashboard...</p>
  if (error) return <p>Failed to load dashboard</p>

  const dashboard = data?.data

  // ✅ Dynamic Stats
  const stats = [
    {
      label: "Total Projects",
      value: dashboard?.cardData?.projects || 0,
      change: "+0%",
      up: true,
      sub: "All active and completed projects",
      icon: <FolderKanban size={20} />,
    },
    {
      label: "Total Clients",
      value: dashboard?.cardData?.clients || 0,
      change: "+0%",
      up: true,
      sub: "Clients you are currently working with",
      icon: <Users size={20} />,
    },
    {
      label: "Total Employees",
      value: dashboard?.cardData?.employees || 0,
      change: "+0%",
      up: true,
      sub: "Employees in your organization",
      icon: <UserCog size={20} />,
    },
    {
      label: "Total Dealers",
      value: dashboard?.cardData?.dealers || 0,
      change: "+0%",
      up: false,
      sub: "Registered dealers in the system",
      icon: <Store size={20} />,
    },
  ]

  // ✅ Chart Data from API
  const chartBars = dashboard?.chartBars || []

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        minHeight: "100%",
      }}
    >
      <style>{`
        .dash-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
      `}</style>

      <TopBar />

      {/* ✅ Dynamic Stats */}
      <StatCard stats={stats} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* ✅ Dynamic Chart */}
        <BarChart chartBars={chartBars} />

        {/* (Optional: later connect real data) */}
        <ActivityFeed data={dashboard?.threeLatestClient} />
      </div>

      {/* (Optional: pass latestProjects later) */}
     <OrdersTable data={dashboard?.latestProjects} />
    </div>
  )
}