import { useDashboardAdd } from "@/feature/dashboard/add/hooks/useDashboardAdd";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { useCompanyStore } from "@/stores/companyStore";
import { LinkedButton } from "@/shared/ui/LinkedButton";
import { Button } from "@/shared/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import DashboardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import DashboardDefaultInfoForm from "./DashboardDefaultInfoForm";

export const DashboardDefaultInfo = () => {
  const { company } = useCompanyStore();
  const tableNamesList = company?.tableNamesList || [];

  const {
    register,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
    isPending,
    handleSave,
    onSubmit,
  } = useDashboardAdd();

  if (isPending) return <LoadingSpinner overlay={true} />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <LinkedButton to="/" variant="ghost" icon={ArrowLeft} className="w-fit">
          돌아가기
        </LinkedButton>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[14px] text-muted-foreground">설정</p>
            <h1 className="text-[28px] font-bold text-foreground">대시보드 생성</h1>
          </div>

          <Button onClick={handleSave} disabled={isPending || !isValid} variant="primary" icon={Save}>
            저장
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <section className="bg-card rounded-2xl shadow-md border border-border/50 p-6">
          <h2 className="text-[16px] font-semibold text-foreground mb-4">기본 정보</h2>
          <DashboardDefaultInfoTitle mode="add" />
          <DashboardDefaultInfoForm register={register} errors={errors} isValid={isValid} onSubmit={onSubmit} tableNamesList={tableNamesList} setValue={setValue} watch={watch} trigger={trigger} />
        </section>
      </div>
    </div>
  );
};
