import axios from "axios";
import { apiClient } from "@/shared/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  accessToken: string;
  accessTokenExpiresAt: number;
  tableNamesList: [];
  company: string;
  message: string;
  refreshToken: string;
}

export const auth = {
  login: async (params: { companyId: string }) => {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, params);
    return response.data;
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  },
};
