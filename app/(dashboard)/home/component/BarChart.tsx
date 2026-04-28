export default function BarChart({ chartBars }: any) {
  return (
    <div className="dash-card anim-fade-up" style={{ padding: "22px" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 700 }}>Active Job</h2>
          <p style={{ fontSize: "12px", color: "gray" }}>
            Mar 11 – Mar 17, 2026
          </p>
        </div>
      </div>

      {/* CHART */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "140px" }}>
        {chartBars.map((bar: any) => (
          <div
            key={bar.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
              <div
                style={{
                  height: `${bar.value}%`,
                  width: "100%",
                  background: "linear-gradient(180deg, #0ea5d4, #1e3a5f)",
                  borderRadius: "6px 6px 0 0",
                }}
              />
            </div>

            <span style={{ fontSize: "11px", color: "#777" }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}