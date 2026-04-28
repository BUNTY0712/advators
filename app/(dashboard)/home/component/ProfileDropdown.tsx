"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut, User } from "lucide-react"

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click
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
    console.log("Logout clicked")

    // 👉 Your logout logic
    localStorage.removeItem("token")

    // Redirect
    window.location.href = "/login"
  }

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Avatar */}
      <img
        src="https://i.pravatar.cc/40"
        onClick={() => setOpen(!open)}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          border: "2px solid rgba(14,165,212,0.3)",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "fixed", // 🔥 FIX: prevents clipping
            top: "10px",       // adjust based on header height
            right: "20px",
            width: "180px",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Profile */}
          <div
            style={itemStyle}
            onClick={() => {
              console.log("Go to profile")
              setOpen(false)
            }}
          >
            <User size={15} />
            Profile
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }} />

          {/* Logout */}
          <div
            style={{ ...itemStyle, color: "#ef4444" }}
            onClick={handleLogout}
          >
            <LogOut size={15} />
            Logout
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const itemStyle: React.CSSProperties = {
  padding: "11px 14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  fontSize: "13px",
  transition: "background 0.15s",
}