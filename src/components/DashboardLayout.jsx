import FiltersPanel from "./FiltersPanel";
import StatsCards from "./StatsCards";
import ChartsGrid from "./ChartsGrid";
import InsightsTable from "./InsightsTable";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-900 shadow-lg">
              B
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                Blackcoffer Dashboard
              </h1>
              <p className="text-xs text-slate-400">
                {/*  Interactive insights · MongoDB · Node · React · Tailwind */}

              </p>
            </div>
          </div>
          <div className="hidden sm:flex gap-2 text-xs text-slate-400">
            <span className="px-2 py-1 rounded-full border border-slate-700">
              {/*Backend: Node + Express + MongoDB */}
            </span>
            <span className="px-2 py-1 rounded-full border border-slate-700">
              {/*  Frontend: React + Vite + Tailwind*/}

            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <FiltersPanel />
          <StatsCards />
          <ChartsGrid />
          <InsightsTable />
        </div>
      </main>
    </div>
  );
}
