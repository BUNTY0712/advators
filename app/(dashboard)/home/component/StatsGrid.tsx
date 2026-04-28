import StatCard from "./StatCard"

export default function StatsGrid({ stats }: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {stats.map((s: any, i: number) => (
        <StatCard key={s.label} s={s} i={i} />
      ))}
    </div>
  )
}