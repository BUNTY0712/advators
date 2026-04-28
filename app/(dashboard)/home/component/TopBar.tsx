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
export default function TopBar() {
  return (
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
          {/* <div
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
          </div> */}

          {/* <button className="topbar-btn"><Calendar size={16} /></button> */}

          {/* <button className="topbar-btn" style={{ position: "relative" }}>
            <Bell size={16} />
            <span
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#0ea5d4",          
                border: "1.5px solid #f5f5f5",
              }}
            />
          </button> */}

<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  
  {/* 🔴 Logout Button */}
  <button

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
  )
}