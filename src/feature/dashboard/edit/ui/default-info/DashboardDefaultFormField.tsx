import { DSAHBOARDDEFAULTINFO } from "@/feature/dashboard/add/model/constants";
import { Input } from "@/shared/ui/Input";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";
import { UseFormRegister } from "react-hook-form";

interface DashboardDefaultFormFieldProps {
  register: UseFormRegister<DashBoardDefaultInfoForm>;
}
export const DashboardDefaultFormField = ({ register }: DashboardDefaultFormFieldProps) => {
  const renderInputField = (name: keyof DashBoardDefaultInfoForm) => {
    return <Input register={register(name)} error={undefined} disabled />;
  };

  return (
    <div className="bg-card border border-border/100 mt-6">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/100">
            <th className="w-[30%] px-5 py-3 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">항목 이름</th>
            <th className="w-[70%] px-5 py-3 text-center text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">입력 값</th>
          </tr>
        </thead>

        <tbody>
          {DSAHBOARDDEFAULTINFO.map(({ label, name }) => (
            <tr key={name} className="border-b border-border last:border-b-0">
              <td className="px-5 py-4 text-[13px] font-medium text-foreground">
                {name !== "dashboardDescription" && <span className="text-red-500 mr-1">*</span>}
                {label}
              </td>
              <td className="px-5 py-4">{renderInputField(name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
