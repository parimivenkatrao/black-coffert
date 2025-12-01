import { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { useDashboardStore } from "../store";
import { api } from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartsGrid() {
  const { stats, setStats } = useDashboardStore();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/insights/stats");
        setStats(res.data || {});
      } catch (e) {
        console.error(e);
      }
    };
    loadStats();
  }, [setStats]);

  const intensityByYear = stats.intensityByYear || [];
  const likelihoodByYear = stats.likelihoodByYear || [];

  return (
    <section className="grid md:grid-cols-2 gap-3">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 shadow-lg shadow-black/40">
        <h3 className="text-xs font-semibold text-slate-300 mb-2">
          Avg Intensity by Start Year
        </h3>
        <Bar
          data={{
            labels: intensityByYear.map((i) => i._id),
            datasets: [
              {
                label: "Intensity",
                data: intensityByYear.map((i) => i.avgIntensity),
                backgroundColor: "rgba(16, 185, 129, 0.6)"
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: "#cbd5f5" } }
            },
            scales: {
              x: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" }
              },
              y: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" }
              }
            }
          }}
          height={220}
        />
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 shadow-lg shadow-black/40">
        <h3 className="text-xs font-semibold text-slate-300 mb-2">
          Avg Likelihood by Start Year
        </h3>
        <Line
          data={{
            labels: likelihoodByYear.map((i) => i._id),
            datasets: [
              {
                label: "Likelihood",
                data: likelihoodByYear.map((i) => i.avgLikelihood),
                borderColor: "rgba(56, 189, 248, 0.9)",
                backgroundColor: "rgba(56, 189, 248, 0.3)",
                tension: 0.3,
                pointRadius: 2
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: "#cbd5f5" } }
            },
            scales: {
              x: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" }
              },
              y: {
                ticks: { color: "#94a3b8" },
                grid: { color: "rgba(148, 163, 184, 0.1)" }
              }
            }
          }}
          height={220}
        />
      </div>
    </section>
  );
}
