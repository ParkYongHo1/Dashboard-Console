import { useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
}

const ErrorPage = ({ title = "문제가 발생했어요", message = "잠시 후 다시 시도해주세요" }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-5">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>

        <h1 className="text-[20px] font-bold text-foreground mb-2">{title}</h1>
        <p className="text-[14px] text-muted-foreground mb-8">{message}</p>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Home className="w-4 h-4" />
          홈으로
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
