import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import alertsData from '@/config/alerts.json';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

export interface SystemAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
}

interface AlertState {
  alerts: SystemAlert[];
  dismissedIds: string[];
  dismissAlert: (id: string) => void;
  restoreAlert: (id: string) => void;
}

export const useAlertStore = create<AlertState>()(
  persist(
    (set) => ({
      alerts: alertsData as SystemAlert[],
      dismissedIds: [],
      dismissAlert: (id) => 
        set((state) => ({
          dismissedIds: [...new Set([...state.dismissedIds, id])]
        })),
      restoreAlert: (id) =>
        set((state) => ({
          dismissedIds: state.dismissedIds.filter(dismissedId => dismissedId !== id)
        })),
    }),
    {
      name: 'redsouth-alerts-storage',
      partialize: (state) => ({ dismissedIds: state.dismissedIds }),
    }
  )
);
