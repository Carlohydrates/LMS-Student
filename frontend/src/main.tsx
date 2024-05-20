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

// import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  // const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/courses",
      element: <Courses />,
    },
    {
      path: "/courses/:id",
      element: <CourseInfo />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/grades",
      element: <Grades />,
    },
  ]);

  return <RouterProvider router={router} />;
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
