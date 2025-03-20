import { create } from "zustand";

type AuthState = {
  user: { email: string; role: string; accessToken?: string } | null;
  setUser: (user: { email: string; role: string; accessToken?: string } | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));