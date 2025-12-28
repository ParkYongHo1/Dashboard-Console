import { handleSessionExpired } from "@/shared/lib/handleSessionExpired";
import { StateGetter, StateUpdater } from "@/stores/companyStore";

export const refreshAccessToken = async (set: StateUpdater, get: StateGetter): Promise<void> => {
  const store = get();
  if (store.isRefreshing) return;

  try {
    set({ isRefreshing: true });
    const { tokenService } = await import("@/services/token/api");

    if (!store.refreshToken) {
      handleSessionExpired();
      return;
    }

    const response = await tokenService.refresh(store.refreshToken!);

    set({
      accessToken: response.accessToken,
      accessTokenExpiresAt: response.accessTokenExpiresAt,
      isRefreshing: false,
    });
    get().scheduleTokenRefresh();
  } catch {
    set({ isRefreshing: false });
    handleSessionExpired();
    return;
  }
};
