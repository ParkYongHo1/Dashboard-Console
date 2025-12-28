import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { AppLayout } from "@/app/layouts/AppLayout";
import LoginPage from "@/pages/login/LoginPage";
import { DashboardListPage } from "@/pages/dashboard/dashboard-list/DashboardListPage";
import { DashboardEditPage } from "@/pages/dashboard/dashboard-edit/DashboardEditPage";
import DashboardAddPage from "@/pages/dashboard/dashboard-add/DashboardAddPage";
import { StatsListPage } from "@/pages/stats/stats-list/StatsListPage";
import ErrorPage from "@/pages/common/ErrorPage";
import { useCompanyStore } from "@/stores/companyStore";
import { AuthWrapper } from "@/feature/auth/ui/AuthWrapper";
import { StatsItemPage } from "@/pages/stats/stats-item/StatsItemPage";
import LandingPage from "@/pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: useCompanyStore.getState().isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <AuthWrapper>
            <DashboardListPage />
          </AuthWrapper>
        ),
      },
      {
        path: "/add-dashboard",
        element: (
          <AuthWrapper>
            <DashboardAddPage />
          </AuthWrapper>
        ),
      },
      {
        path: "/edit-dashboard/:dashboardId",
        element: (
          <AuthWrapper>
            <DashboardEditPage />
          </AuthWrapper>
        ),
      },
      {
        path: "/stats-list",
        element: (
          <AuthWrapper>
            <StatsListPage />
          </AuthWrapper>
        ),
      },
      {
        path: "/stats/:dashboardId",
        element: (
          <AuthWrapper>
            <StatsItemPage />
          </AuthWrapper>
        ),
      },
    ],
  },
  { path: "/404", element: <ErrorPage title="페이지를 찾을 수 없습니다" message="요청하신 페이지가 존재하지 않습니다." /> },
  { path: "*", element: <Navigate to="/404" replace /> },
]);
