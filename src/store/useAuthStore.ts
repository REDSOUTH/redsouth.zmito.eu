import { create } from 'zustand';
import type { RecordModel } from 'pocketbase';
import { pb } from '@/lib/pb';

interface AuthState {
  user: RecordModel | null;
  isLoading: boolean;
  login: (user: RecordModel) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initial sync & listener
  pb.authStore.onChange((_token, model) => {
    set({ user: model });
  }, true);

  return {
    user: pb.authStore.model,
    isLoading: false,
    login: (user) => set({ user }),
    logout: () => {
      pb.authStore.clear();
      set({ user: null });
    },
  };
});
