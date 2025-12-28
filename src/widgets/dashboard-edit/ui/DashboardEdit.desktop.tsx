// DashboardEdit.desktop.tsx
import { LinkedButton } from "@/shared/ui/LinkedButton";
import { Button } from "@/shared/ui/Button";
import { ConfirmToast } from "@/shared/ui/ConfirmToast";
import DashboardDefaultInfo from "@/feature/dashboard/edit/ui/default-info/DashboardDefaultInfo";
import DashboardDetailInfo from "@/feature/dashboard/edit/ui/detail-info/DashboardDetailInfo";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { DashboardEditSkeletonDesktop } from "./DashboardEditSkeleton.desktop";
import { DashboardEditProps } from "../model/type";

export const DashboardEditDesktop = ({ currentDashboard, isLoading, isPending, isValid, handleSave, handleDelete, showDeleteConfirm, setShowDeleteConfirm, confirmDelete }: DashboardEditProps) => {
  if (isLoading) return <DashboardEditSkeletonDesktop />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <LinkedButton to="/" variant="ghost" icon={ArrowLeft} className="w-fit">
          돌아가기
        </LinkedButton>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[14px] text-muted-foreground">설정</p>
            <h1 className="text-[28px] font-bold text-foreground">대시보드 수정</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={handleDelete} disabled={true} variant="danger" icon={Trash2}>
              삭제
            </Button>

            <Button onClick={handleSave} disabled={isPending || !isValid} variant="primary" icon={Save}>
              저장
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <section className="bg-card rounded-2xl shadow-md border border-border/50 p-6">
          <h2 className="text-[16px] font-semibold text-foreground mb-4">기본 정보</h2>
          <DashboardDefaultInfo />
        </section>

        {currentDashboard && (
          <section className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-[16px] font-semibold text-foreground mb-4">상세 설정</h2>
            <DashboardDetailInfo />
          </section>
        )}
      </div>

      <ConfirmToast
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="대시보드를 삭제하시겠습니까?"
        description="삭제된 대시보드는 복구할 수 없습니다."
        onConfirm={confirmDelete}
        confirmText="삭제"
        variant="danger"
      />
    </div>
  );
};
