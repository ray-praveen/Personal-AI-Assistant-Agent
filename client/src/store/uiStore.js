import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarOpen: true,
  commandText: '',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCommandText: (commandText) => set({ commandText })
}));
