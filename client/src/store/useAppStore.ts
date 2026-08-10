import { create } from 'zustand';

interface AppState {
  user: null | { name: string };
  setUser: (user: { name: string }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));