import { useCompanyStore } from "@/stores/companyStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../api/api";

export const useAuth = () => {
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);
  const company = useCompanyStore((state) => state.company);
  const login = useCompanyStore((state) => state.login);
  const logout = useCompanyStore((state) => state.logout);
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending: isLoggingIn } = useMutation({
    mutationFn: auth.login,
    onSuccess: (response) => {
      login(
        {
          company: response.company,
          tableNamesList: response.tableNamesList,
        },
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accessTokenExpiresAt: response.accessTokenExpiresAt,
        }
      );
      toast.success(`${response.company} 계정으로 로그인합니다.`);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.status === 400 ? "일치하는 기업 정보가 없습니다." : "로그인 중 오류가 발생했습니다.");
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      logout();
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    },
    onError: () => {
      logout();
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return {
    isAuthenticated,
    company,
    loginMutate,
    isLoggingIn,
    handleLogout,
    isLoggingOut,
  };
};
