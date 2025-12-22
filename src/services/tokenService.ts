import { handleSessionExpired } from "@/shared/lib/handleSessionExpired";
import { StateGetter, StateUpdater } from "@/stores/companyStore";

export const refreshAccessToken = async (set: StateUpdater, get: StateGetter): Promise<void> => {
  const store = get();
  if (store.isRefreshing) return;

  try {
    set({ isRefreshing: true });
    const { tokenService } = await import("@/services/token/api");

    if (!store.refreshToken) {
      handleSessionExpired(store);
    }

    const response = await tokenService.refresh(store.refreshToken!);

    set({
      accessToken: response.accessToken,
      accessTokenExpiresAt: response.accessTokenExpiresAt,
    });

    scheduleTokenRefresh(set, get);
  } catch {
    handleSessionExpired(store);
  } finally {
    set({ isRefreshing: false });
  }
};

export const scheduleTokenRefresh = (set: StateUpdater, get: StateGetter): void => {
  const state = get();
  if (!state.accessTokenExpiresAt || state.isRefreshing) return;

  const now = Date.now();
  const refreshTime = state.accessTokenExpiresAt - 30 * 1000;

  if (now >= refreshTime) {
    refreshAccessToken(set, get);
    return;
  }

  const timer = setTimeout(() => refreshAccessToken(set, get), refreshTime - now);

  set({ refreshTimer: timer });
};
