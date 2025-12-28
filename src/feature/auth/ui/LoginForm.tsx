import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface LoginFormData {
  companyId: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onGuestLogin: () => void;
}

export function LoginForm({ onSubmit, onGuestLogin }: LoginFormProps) {
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: { companyId: "" },
  });

  const companyId = watch("companyId");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            {...register("companyId", {
              required: "기업 ID를 입력해주세요",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-5 py-4 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none transition-all
              ${errors.companyId ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`}
          />
          <label
            className={`absolute left-5 px-1 text-sm transition-all pointer-events-none bg-white 
              ${isFocused || companyId ? "top-0 -translate-y-1/2 text-xs " : "top-1/2 -translate-y-1/2 text-gray-400"}`}
          >
            기업 ID
          </label>
        </div>
        {errors.companyId && <p className="mt-2 text-sm text-red-400">{errors.companyId.message}</p>}

        <button type="submit" disabled={!isValid} className="cursor-pointer w-full bg-black text-white py-4 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <span>로그인</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </form>

      <div className="text-center pt-2">
        <button onClick={onGuestLogin} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
          데모 계정으로 로그인 →
        </button>
      </div>
    </>
  );
}
