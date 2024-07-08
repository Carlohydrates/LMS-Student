import { GoogleOAuthProvider } from "@react-oauth/google";
import { Flowbite } from "flowbite-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import Courses from "./pages/CourseCatalog";
import CourseInfo from "./pages/CourseInfo";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import { NotFoundPage } from "./pages/NotFoundPage";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";
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
