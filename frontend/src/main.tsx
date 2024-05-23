/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard.tsx";
import Courses from "./pages/Courses.tsx";
import Students from "./pages/Students.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import CourseInfo from "./pages/CourseInfo.tsx";
import Grades from "./pages/Grades.tsx";
import Login from "./pages/Login.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import SignUp from "./pages/SignUp.tsx";
import Landing from "./pages/Landing.tsx";
import { useAuthContext } from "./hooks/useAuthContext.ts";
import { Navigate } from "react-router-dom";

interface RouteProps {
  children: React.ReactNode;
}

const PublicRoutes: React.FC<RouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const ProtectedRoutes: React.FC<RouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoutes>
          <Landing />,
        </PublicRoutes>
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Login />,
        </PublicRoutes>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoutes>
          <SignUp />,
        </PublicRoutes>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <Dashboard />,
        </ProtectedRoutes>
      ),
    },
    {
      path: "/courses",
      element: (
        <ProtectedRoutes>
          <Courses />,
        </ProtectedRoutes>
      ),
    },
    {
      path: "/courses/:id",
      element: <CourseInfo />,
    },
    {
      path: "/students",
      element: (
        <ProtectedRoutes>
          <Students />,
        </ProtectedRoutes>
      ),
    },
    {
      path: "/grades",
      element: (
        <ProtectedRoutes>
          <Grades />,
        </ProtectedRoutes>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </AuthContextProvider>
);
