"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MoreHorizontal,
  Bell,
  Search,
  Calendar,
  Activity,
  LogOut,
  User,
} from "lucide-react"
import ProfileDropdown from "./ProfileDropdown"

// ── STAT CARDS DATA ──
const stats = [
  {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    up: true,
    icon: <DollarSign size={20} />,
    sub: "vs last month",
  },
  {
    label: "Total Drivers",
    value: "12,847",
    change: "+8.2%",
    up: true,
    icon: <Users size={20} />,
    sub: "vs last month",
  },
  {
    label: "Active Drivers",
    value: "3,420",
    change: "-2.4%",
    up: false,
    icon: <ShoppingCart size={20} />,
    sub: "vs last month",
  },
  {
    label: "Completed Rides",
    value: "98,312",
    change: "+19.1%",
    up: true,
    icon: <Eye size={20} />,
    sub: "vs last month",
  },
]

// ── RECENT ORDERS ──
const orders = [
  { id: "#ORD-0091", client: "Rahul Mehta",    amount: "$320.00",   status: "Completed", date: "Mar 17" },
  { id: "#ORD-0090", client: "Priya Sharma",   amount: "$145.50",   status: "Pending",   date: "Mar 16" },
  { id: "#ORD-0089", client: "James O'Brien",  amount: "$892.00",   status: "Completed", date: "Mar 16" },
  { id: "#ORD-0088", client: "Sara Kim",       amount: "$54.00",    status: "Cancelled", date: "Mar 15" },
  { id: "#ORD-0087", client: "Amit Das",       amount: "$1,200.00", status: "Completed", date: "Mar 15" },
]

// ── ACTIVITY FEED ──
const activities = [
  { text: "New user registered",          time: "2 min ago",  dot: "#0ea5d4" },
  { text: "Order #0091 completed",        time: "14 min ago", dot: "#22c55e" },
  { text: "Server CPU spike detected",    time: "1 hr ago",   dot: "#f59e0b" },
  { text: "New comment on blog post",     time: "3 hr ago",   dot: "#3b82f6" },
  { text: "Backup completed successfully",time: "5 hr ago",   dot: "#22c55e" },
]

// ── BAR CHART (pure CSS) ──
const chartBars = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 72 },
  { label: "Sat", value: 55 },
  { label: "Sun", value: 38 },
]

const statusColor: Record<string, string> = {
  Completed: "#22c55e",
  Pending:   "#f59e0b",
  Cancelled: "#ef4444",
}
const statusBg: Record<string, string> = {
  Completed: "rgba(34,197,94,0.08)",
  Pending:   "rgba(245,158,11,0.08)",
  Cancelled: "rgba(239,68,68,0.08)",
}

export default function DashboardContent() {
    const router = useRouter()

  const [open, setOpen] = useState(false)
const dropdownRef = useRef<HTMLDivElement | null>(null)

// close on outside click
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }
  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside)
}, [])

const handleLogout = () => {
  router.push("/login")
  console.log("Logout clicked")
  // 👉 your logout logic
  // localStorage.removeItem("token")
  // window.location.href = "/login"
}

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        color: "#111",
        minHeight: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        /* ── VRM Transport palette ── */
        :root {
          --vrm-primary:      #0ea5d4;
          --vrm-primary-dark: #1e6fa3;
          --vrm-deep:         #1e3a5f;
          --vrm-accent-bg:    rgba(14,165,212,0.08);
          --vrm-accent-bg2:   rgba(14,165,212,0.07);
          --vrm-accent-border:rgba(14,165,212,0.2);
        }

        .dash-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .dash-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09);
          transform: translateY(-1px);
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--vrm-accent-bg);
          color: var(--vrm-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bar-fill {
          border-radius: 6px 6px 0 0;
          background: linear-gradient(180deg, #0ea5d4 0%, #1e3a5f 100%);
          transition: height 0.6s cubic-bezier(0.34,1.56,0.64,1);
          width: 100%;
        }
        .bar-fill:hover {
          background: linear-gradient(180deg, #38bdf8 0%, #0ea5d4 100%);
        }
        .wtm-table-row:hover {
          background: var(--vrm-accent-bg);
        }
        .topbar-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          cursor: pointer;
          color: rgba(0,0,0,0.5);
          transition: all 0.15s ease;
        }
        .topbar-btn:hover {
          border-color: var(--vrm-accent-border);
          color: var(--vrm-primary);
          background: var(--vrm-accent-bg);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up {
          animation: fadeUp 0.4s ease both;
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div
  className="anim-fade-up"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
    animationDelay: "0ms",
    overflow: "visible",   // ✅ ADD THIS LINE
  }}
>
        <div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#0f0f0f",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.4)", marginTop: "2px" }}>
            Welcome back,  Here's what's happening today.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "10px",
              padding: "7px 14px",
              fontSize: "13px",
              color: "rgba(0,0,0,0.35)",
              cursor: "text",
            }}
          >
            <Search size={14} />
            <span>Search...</span>
          </div>

          <button className="topbar-btn"><Calendar size={16} /></button>

          <button className="topbar-btn" style={{ position: "relative" }}>
            <Bell size={16} />
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#0ea5d4",          /* teal notification dot */
                border: "1.5px solid #f5f5f5",
              }}
            />
          </button>

<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  
  {/* 🔴 Logout Button */}
  <button
    onClick={handleLogout}
    className="topbar-btn"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "0 10px",
      width: "auto",
      color: "#ef4444",
      fontSize: "13px",
      fontWeight: 500,
    }}
  >
    <LogOut size={16} />
    Logout
  </button>

  {/* 👤 Profile Image */}
  <img
    src="https://i.pravatar.cc/40"
    style={{
      width: "36px",
      height: "36px",
      borderRadius: "10px",
      border: "2px solid rgba(14,165,212,0.3)",
      objectFit: "cover",
      cursor: "pointer",
    }}
  />

</div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="dash-card anim-fade-up"
            style={{ padding: "20px", animationDelay: `${i * 60}ms` }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
              <div className="stat-icon-wrap">{s.icon}</div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: s.up ? "#16a34a" : "#ef4444",
                  background: s.up ? "rgba(22,163,74,0.08)" : "rgba(239,68,68,0.08)",
                  padding: "3px 8px",
                  borderRadius: "20px",
                }}
              >
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </span>
            </div>
            <p style={{ fontSize: "26px", fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.45)", marginTop: "6px", fontWeight: 500 }}>
              {s.label}
            </p>
            <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.28)", marginTop: "2px" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── CHART + ACTIVITY ROW ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Bar Chart */}
        <div className="dash-card anim-fade-up" style={{ padding: "22px", animationDelay: "280ms" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f" }}>Weekly Revenue</h2>
              <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.38)", marginTop: "2px" }}>Mar 11 – Mar 17, 2026</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#0ea5d4", display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)" }}>Revenue</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "140px" }}>
            {chartBars.map(bar => (
              <div
                key={bar.label}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                  <div className="bar-fill" style={{ height: `${bar.value}%` }} title={`${bar.value}%`} />
                </div>
                <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.38)", fontWeight: 500 }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="dash-card anim-fade-up" style={{ padding: "22px", animationDelay: "340ms" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f" }}>Recent Activity</h2>
            <Activity size={15} style={{ color: "#0ea5d4" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ marginTop: "4px", flexShrink: 0 }}>
                  <span
                    style={{
                      display: "block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: a.dot,
                      boxShadow: `0 0 6px ${a.dot}60`,
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "12.5px", fontWeight: 500, color: "#1a1a1a", lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.33)", marginTop: "2px" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT ORDERS TABLE ── */}
      <div className="dash-card anim-fade-up" style={{ padding: "22px", animationDelay: "400ms" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f" }}>Recent Orders</h2>
            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.38)", marginTop: "2px" }}>Last 5 transactions</p>
          </div>
          <button
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#0ea5d4",                          /* teal */
              background: "rgba(14,165,212,0.08)",       /* teal bg */
              border: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View All
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {["Order ID", "Client", "Amount", "Status", "Date", ""].map(h => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(0,0,0,0.35)",
                    padding: "0 12px 12px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr
                key={o.id}
                className="wtm-table-row"
                style={{
                  borderBottom: i < orders.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                  transition: "background 0.15s",
                }}
              >
                <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: 600, color: "#111" }}>{o.id}</td>
                <td style={{ padding: "13px 12px", fontSize: "13px", color: "rgba(0,0,0,0.65)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <img
                      src={`https://i.pravatar.cc/28?u=${o.client}`}
                      style={{ width: "26px", height: "26px", borderRadius: "8px", objectFit: "cover" }}
                    />
                    {o.client}
                  </div>
                </td>
                <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: 700, color: "#0f0f0f" }}>{o.amount}</td>
                <td style={{ padding: "13px 12px" }}>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: statusColor[o.status],
                      background: statusBg[o.status],
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: "13px 12px", fontSize: "12.5px", color: "rgba(0,0,0,0.4)" }}>{o.date}</td>
                <td style={{ padding: "13px 12px" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(0,0,0,0.3)",
                      padding: "4px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}