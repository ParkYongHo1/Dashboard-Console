import { Footer } from "@/widgets/footer/ui/Footer";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
