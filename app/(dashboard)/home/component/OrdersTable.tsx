import { MoreHorizontal } from "lucide-react"

const statusColor: Record<string, string> = {
  Completed: "#22c55e",
  Pending: "#f59e0b",
  Cancelled: "#ef4444",
}

const statusBg: Record<string, string> = {
  Completed: "rgba(34,197,94,0.08)",
  Pending: "rgba(245,158,11,0.08)",
  Cancelled: "rgba(239,68,68,0.08)",
}

export default function OrdersTable({ data = [] }: any) {

  // ✅ Take only latest 5
  const orders = data.slice(0, 5).map((item: any) => ({
  id: `PRJ-${item.id}`,
  client: item.name || "Untitled Project",
  service: item.project_timeline,              // ✅ timeline
  amount: `₹${item.project_cost}`,             // ✅ cost
  status: item.project_status || "Pending",    // ✅ correct field
  date: item.created_at,
}))
  return (
      <div className="dash-card anim-fade-up" style={{ padding: "22px", animationDelay: "400ms" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f" }}>Recent Jobs</h2>
            <p style={{ fontSize: "12px", color: "rgba(0,0,0,0.38)", marginTop: "2px" }}>Last 5 jobs</p>
          </div>
          <button
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#0ea5d4",                         
              background: "rgba(14,165,212,0.08)",       
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
              {["Order ID", "Client Name", "Load Type", "Status", "Date", ""].map(h => (
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
            {orders.map((o: any, i: number) => (
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
  )
}