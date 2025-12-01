import { useEffect, useState } from "react";
import { useDashboardStore } from "../store";
import { api } from "../api";

const filterFields = [
  { key: "end_year", label: "End Year" },
  { key: "topic", label: "Topic" },
  { key: "sector", label: "Sector" },
  { key: "region", label: "Region" },
  { key: "pestle", label: "PESTLE" },
  { key: "source", label: "Source" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" }
];

export default function FiltersPanel() {
  const { filters, setFilters, setData, setStats, loading, setLoading } =
    useDashboardStore();
  const [options, setOptions] = useState({});

  // Load distinct options for dropdowns
  useEffect(() => {
    const loadOptions = async () => {
      try {
        // Simple approach: fetch all and compute uniques on frontend
        setLoading(true);
        const res = await api.get("/insights");
        const rows = res.data || [];

        const nextOptions = {};
        filterFields.forEach(({ key }) => {
          nextOptions[key] = Array.from(
            new Set(
              rows
                .map((r) => r[key])
                .filter((v) => v && v !== "" && v !== " ")
            )
          ).sort();
        });
        setOptions(nextOptions);
        setData(rows);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, [setData, setLoading]);

  const handleChange = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
  };

  const handleApply = async () => {
    try {
      setLoading(true);
      const params = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v && v !== "all") params[k] = v;
      });
      const [dataRes, statsRes] = await Promise.all([
        api.get("/insights", { params }),
        api.get("/insights/stats", { params })
      ]);
      setData(dataRes.data || []);
      setStats(statsRes.data || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({});
    handleApply();
  };

  return (
    <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between mb-3 gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-300">
            Filters
          </h2>
          <p className="text-xs text-slate-400">
            Use combinations of filters to explore the dataset.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {filterFields.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              {label}
            </label>
            <select
              value={filters[key] || "all"}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-slate-950/60 border border-slate-700 rounded-xl px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All</option>
              {(options[key] || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {loading && (
        <p className="mt-3 text-xs text-emerald-400">
          Loading data from backend...
        </p>
      )}
    </section>
  );
}
