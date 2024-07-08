import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/CourseCatalog";
import { NotFoundPage } from "./pages/NotFoundPage";
import CourseInfo from "./pages/CourseInfo";
import Grades from "./pages/Grades";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import Pricing from "./pages/Pricing";
import MyCourses from "./pages/MyCourses";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./themes/customTheme";

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
      { path: "/coursecatalog", element: <Courses /> },
      { path: "/mycourses", element: <MyCourses /> },
      { path: "/courses/:id", element: <CourseInfo /> },
      { path: "/pricing", element: <Pricing /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <React.StrictMode>
        <Flowbite theme={{ theme: customTheme }}>
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
        </Flowbite>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </AuthContextProvider>
);
