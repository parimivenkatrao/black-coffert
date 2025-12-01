import { useDashboardStore } from "../store";

export default function InsightsTable() {
  const { data } = useDashboardStore();

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 shadow-lg shadow-black/40 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">
          Insights (Top {Math.min(data.length, 50)} rows)
        </h3>
        <p className="text-[11px] text-slate-500">
          Showing first 50 rows for quick preview
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide bg-slate-900/80 text-slate-400">
              <th className="px-2 py-2 text-left">Title</th>
              <th className="px-2 py-2 text-left">Topic</th>
              <th className="px-2 py-2 text-left hidden md:table-cell">Sector</th>
              <th className="px-2 py-2 text-left hidden sm:table-cell">Country</th>
              <th className="px-2 py-2 text-left hidden lg:table-cell">Region</th>
              <th className="px-2 py-2 text-right">Intensity</th>
              <th className="px-2 py-2 text-right hidden md:table-cell">
                Likelihood
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-slate-800 hover:bg-slate-800/60 transition-colors"
              >
                <td className="px-2 py-2 max-w-[220px] truncate">
                  {row.title || "-"}
                </td>
                <td className="px-2 py-2">{row.topic || "-"}</td>
                <td className="px-2 py-2 hidden md:table-cell">
                  {row.sector || "-"}
                </td>
                <td className="px-2 py-2 hidden sm:table-cell">
                  {row.country || "-"}
                </td>
                <td className="px-2 py-2 hidden lg:table-cell">
                  {row.region || "-"}
                </td>
                <td className="px-2 py-2 text-right">
                  {row.intensity ?? "-"}
                </td>
                <td className="px-2 py-2 text-right hidden md:table-cell">
                  {row.likelihood ?? "-"}
                </td>
              </tr>
            ))}
            {!data.length && (
              <tr>
                <td
                  colSpan={7}
                  className="px-2 py-8 text-center text-slate-500 text-xs"
                >
                  No data loaded yet. Make sure backend is running on{" "}
                  <span className="font-mono text-emerald-400">
                    http://localhost:5000
                  </span>{" "}
                  and click <span className="font-semibold">Apply</span> in the
                  filters panel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
