import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { useAuth } from "@/feature/auth/hooks/useAuth";
import { LoginForm } from "@/feature/auth/ui/LoginForm";

export function Login() {
  const { loginMutate, isLoggingIn } = useAuth();

  if (isLoggingIn) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md">
        <div className="p-10 space-y-8">
          <div className="space-y-5">
            <Link to="/" className="text-3xl font-bold pb-4">
              DASHBOARD
            </Link>
            <h2 className="text-xl font-bold py-6">로그인</h2>
          </div>

          <LoginForm onSubmit={(data) => loginMutate(data)} onGuestLogin={() => loginMutate({ companyId: "callbot_id" })} />
        </div>
      </motion.div>
    </div>
  );
}
