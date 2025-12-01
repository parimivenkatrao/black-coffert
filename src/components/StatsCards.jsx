import { useMemo } from "react";
import { useDashboardStore } from "../store";

export default function StatsCards() {
  const { data } = useDashboardStore();

  const { total, avgIntensity, avgLikelihood, countries } = useMemo(() => {
    if (!data.length) return { total: 0, avgIntensity: 0, avgLikelihood: 0, countries: 0 };
    const total = data.length;
    const intensitySum = data.reduce((acc, r) => acc + (r.intensity || 0), 0);
    const likelihoodSum = data.reduce((acc, r) => acc + (r.likelihood || 0), 0);
    const countriesSet = new Set(
      data.map((r) => r.country).filter((c) => c && c !== "")
    );
    return {
      total,
      avgIntensity: intensitySum / total,
      avgLikelihood: likelihoodSum / total,
      countries: countriesSet.size
    };
  }, [data]);

  const cards = [
    {
      label: "Total Insights",
      value: total.toLocaleString(),
      badge: "MongoDB documents"
    },
    {
      label: "Avg. Intensity",
      value: avgIntensity.toFixed(2),
      badge: "Across filtered data"
    },
    {
      label: "Avg. Likelihood",
      value: avgLikelihood.toFixed(2),
      badge: "Risk indicator"
    },
    {
      label: "Countries Covered",
      value: countries,
      badge: "Geographic spread"
    }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 flex flex-col gap-1 shadow-lg shadow-black/40"
        >
          <div className="text-[11px] uppercase tracking-wide text-slate-400">
            {card.label}
          </div>
          <div className="text-xl font-semibold">{card.value}</div>
          <div className="text-[11px] text-emerald-400">{card.badge}</div>
        </article>
      ))}
    </section>
  );
}
