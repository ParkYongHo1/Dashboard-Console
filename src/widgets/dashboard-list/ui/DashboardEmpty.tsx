import { LinkedButton } from "@/shared/ui/LinkedButton";
import { FolderOpen, Plus } from "lucide-react";

export const DashboardEmpty = () => {
  return (
    <div className="min-h-[calc(100vh-15vh)]  flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <FolderOpen className="w-8 h-8 text-muted-foreground" />
      </div>

      <p className="text-[15px] font-medium text-foreground mb-1">아직 대시보드가 없어요</p>
      <p className="text-[13px] text-muted-foreground mb-6">새 대시보드를 만들어 시작해보세요</p>

      <LinkedButton to="/add-dashboard" variant="primary" size="lg" className="rounded-xl">
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        대시보드 만들기
      </LinkedButton>
    </div>
  );
};
