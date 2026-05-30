import { Clock, CheckCircle2, Target } from "lucide-react";

export function StatsTile() {
  const stats = [
    { label: "Hours this week", value: "12.4", icon: Clock, color: "text-arc-300" },
    { label: "Lessons done", value: "38", icon: CheckCircle2, color: "text-void-300" },
    { label: "Goals met", value: "6/7", icon: Target, color: "text-nova-400" },
  ];

  return (
    <article className="rounded-2xl border border-white/[0.06] bg-space-850 p-5">
      <h2 className="text-xs font-mono text-white/30 uppercase tracking-wider mb-4">
        This Week
      </h2>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-xs text-white/40">{stat.label}</span>
            </div>
            <span className={`text-sm font-mono font-semibold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
