import { useForm } from "react-hook-form";
import { useDashboardCreate } from "./useDashboardCreate";

interface DashBoardDefaultInfoForm {
  dashboardName: string;
  tableName: string;
  dashboardDescription?: string;
}

export const useDashboardAdd = () => {
  const { mutate, isPending } = useDashboardCreate();

  const form = useForm<DashBoardDefaultInfoForm>({
    mode: "onChange",
    defaultValues: {
      dashboardName: "",
      tableName: "",
      dashboardDescription: "",
    },
  });

  const onSubmit = (data: DashBoardDefaultInfoForm) => {
    mutate(data);
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return {
    ...form,
    isPending,
    handleSave,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
