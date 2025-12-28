import { useCompanyStore } from "@/stores/companyStore";
import { toast } from "sonner";

export const handleSessionExpired = () => {
  const store = useCompanyStore.getState();
  if (!store.isAuthenticated) return;
  store.logout();
  toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
};
