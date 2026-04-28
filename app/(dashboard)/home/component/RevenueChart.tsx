export default function RevenueChart({ chartBars }: any) {
  return (
    <div
      className="dash-card anim-fade-up"
      style={{ padding: "22px", animationDelay: "280ms" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 700 }}>Weekly Revenue</h2>
          <p style={{ fontSize: "12px", opacity: 0.5 }}>Mar 11 – Mar 17, 2026</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "140px" }}>
        {chartBars.map((bar: any) => (
          <div key={bar.label} style={{ flex: 1 }}>
            <div className="bar-fill" style={{ height: `${bar.value}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}