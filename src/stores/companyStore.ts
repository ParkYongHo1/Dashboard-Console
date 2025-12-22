import { refreshAccessToken } from "@/services/tokenService";
import { handleSessionExpired } from "@/shared/lib/handleSessionExpired";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StateUpdater = typeof useCompanyStore.setState;
export type StateGetter = typeof useCompanyStore.getState;

export interface CompanyInfo {
  company: string;
  tableNamesList: string[];
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
}

interface CompanyState {
  company: CompanyInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  refreshTimer: NodeJS.Timeout | null;
  isRefreshing: boolean;

  login: (company: CompanyInfo, tokens: Tokens) => void;
  logout: () => void;
  updateAccessToken: (accessToken: string, expiresAt?: number) => void;
  scheduleTokenRefresh: () => void;
  clearRefreshTimer: () => void;
  setRefreshing: (isRefreshing: boolean) => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      company: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,
      refreshTimer: null,
      isRefreshing: false,

      login: (company, tokens) => {
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
        }

        set({
          company,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpiresAt: tokens.accessTokenExpiresAt,
          isAuthenticated: true,
          refreshTimer: null,
          isRefreshing: false,
        });

        get().scheduleTokenRefresh();
      },

      logout: () => {
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
        }

        set({
          company: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
          refreshTimer: null,
          isRefreshing: false,
        });
      },

      updateAccessToken: (accessToken, expiresAt) => {
        set((state) => ({
          accessToken,
          accessTokenExpiresAt: expiresAt || state.accessTokenExpiresAt,
        }));
      },

      scheduleTokenRefresh: () => {
        const { accessTokenExpiresAt, refreshTimer, isRefreshing } = get();

        if (!accessTokenExpiresAt || isRefreshing) return;

        if (refreshTimer) clearTimeout(refreshTimer);

        const refreshTime = accessTokenExpiresAt - 30 * 1000;
        const now = Date.now();

        const timer = setTimeout(() => refreshAccessToken(set, get), refreshTime - now);
        set({ refreshTimer: timer });
      },

      clearRefreshTimer: () => {
        const currentTimer = get().refreshTimer;
        if (currentTimer) {
          clearTimeout(currentTimer);
          set({ refreshTimer: null });
        }
      },

      setRefreshing: (isRefreshing) => {
        set({ isRefreshing });
      },
    }),
    {
      name: "company-storage",
      partialize: (state) => ({
        company: state.company,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            handleSessionExpired(useCompanyStore.getState());
          } else {
            if (state?.isAuthenticated && state?.accessTokenExpiresAt) {
              if (Date.now() >= state.accessTokenExpiresAt) {
                handleSessionExpired(useCompanyStore.getState());
              } else {
                setTimeout(() => {
                  state.scheduleTokenRefresh?.();
                }, 100);
              }
            }
          }
        };
      },
    }
  )
);
