import { TrendingUp, TrendingDown } from "lucide-react"

export default function StatCard({ stats, i }: any) {
  
  return (
  <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {stats.map((s: any, i: any) => (
            <div
              key={s.label}
              className="dash-card anim-fade-up"
              style={{ padding: "20px", animationDelay: `${i * 60}ms` }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
                <div className="stat-icon-wrap">{s.icon}</div>
                {/* <span
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
                </span> */}
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
  )
}