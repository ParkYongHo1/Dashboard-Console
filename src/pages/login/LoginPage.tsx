import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";

import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/feature/auth/hooks/useAuth";

interface FormData {
  companyId: string;
}

export default function LoginPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { loginMutate, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { companyId: "" },
  });

  const companyId = watch("companyId");

  const onSubmit = (data: { companyId: string }) => {
    loginMutate(data);
  };

  const handleGuestLogin = () => {
    setValue("companyId", "test_id");
    loginMutate({ companyId: "test_id" });
  };

  if (isLoggingIn) {
    return <LoadingSpinner overlay size="lg" color="blue" text="로그인 중입니다..." />;
  }

  return (
    <div className="relative">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md">
        <div className="p-10 space-y-8">
          {/* header */}
          <div className="space-y-5">
            <Link to="/" className="text-3xl font-bold pb-4">
              DASHBOARD
            </Link>
            <h2 className="text-xl font-bold py-6">로그인</h2>
          </div>

          {/* form */}
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
            {/* submit */}
            <button type="submit" disabled={!isValid} className="cursor-pointer w-full bg-black text-white py-4 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <span>로그인</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </form>

          {/* guest */}
          <div className="text-center pt-2">
            <button onClick={handleGuestLogin} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              데모 계정으로 로그인 →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
