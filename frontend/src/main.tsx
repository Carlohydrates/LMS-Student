import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import { NotFoundPage } from "./pages/NotFoundPage";
import CourseInfo from "./pages/CourseInfo";
import Grades from "./pages/Grades";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import { ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import PublicRoutes from "./layouts/PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:id", element: <CourseInfo /> },
      { path: "/grades", element: <Grades /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <React.StrictMode>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
        <RouterProvider router={router} />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </AuthContextProvider>
);

