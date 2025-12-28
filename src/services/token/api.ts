import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
}

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export const tokenService = {
  refresh: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    if (refreshPromise) return refreshPromise;

    refreshPromise = axios
      .post<RefreshTokenResponse>(`${API_BASE_URL}/auth/reissue`, { refreshToken })
      .then((res) => res.data)
      .finally(() => {
        refreshPromise = null;
      });

    return refreshPromise;
  },
};
