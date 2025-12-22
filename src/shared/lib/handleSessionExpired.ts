import { StateGetter } from "@/stores/companyStore";
import { toast } from "sonner";

export const handleSessionExpired = (store: ReturnType<StateGetter>) => {
  toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
  store.logout();
};
