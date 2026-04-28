"use client"
import { Activity } from "lucide-react"

export default function ActivityFeed({ data = [] }: any) {

  // ✅ map API data → UI format
  const activities = data.map((item: any, index: number) => ({
    text: `${item.name} joined as a new client`,
    time: item.created_at,
    dot: index === 0 ? "#22c55e" : index === 1 ? "#3b82f6" : "#14b8a6",
  }))

  return (
    <div className="dash-card anim-fade-up" style={{ padding: "22px", animationDelay: "340ms" }}>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f" }}>
          Recent Clients
        </h2>
        <Activity size={15} style={{ color: "#0ea5d4" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {activities.length > 0 ? (
          activities.map((a: any, i: number) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: a.dot,
                  marginTop: "6px",
                }}
              />

              <div>
                <p style={{ fontSize: "12.5px", fontWeight: 500 }}>
                  {a.text}
                </p>
                <p style={{ fontSize: "11px", color: "gray" }}>
                  {a.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "12px", color: "gray" }}>
            No recent clients
          </p>
        )}
      </div>
    </div>
  )
}