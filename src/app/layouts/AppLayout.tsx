import Footer from "@/components/common/Footer/Footer";
import { useTheme } from "@/shared/hooks/useTheme";
import { Header } from "@/widgets/header/ui/Header";
import { Moon, Sun } from "lucide-react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="bg-white">
      <Header />
      <button onClick={toggleTheme} className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl " aria-label="Toggle theme">
        {theme === "light" ? <Moon className="w-5 h-5 text-gray-700" /> : <Sun className="w-5 h-5 text-yellow-500" />}
      </button>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
