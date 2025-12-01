import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  filters: {},
  data: [],
  stats: {},
  loading: false,
  setFilters: (filters) => set({ filters }),
  setData: (data) => set({ data }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading })
}));
