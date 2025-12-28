import { tokenService } from "@/services/token/api";
import { useCompanyStore } from "@/stores/companyStore";
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { handleSessionExpired } from "../handleSessionExpired";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const store = useCompanyStore.getState();
          if (!store.refreshToken) throw new Error("No refresh token");

          const { accessToken, accessTokenExpiresAt } = await tokenService.refresh(store.refreshToken);

          store.updateAccessToken(accessToken, accessTokenExpiresAt);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          handleSessionExpired();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
