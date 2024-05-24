/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataCredentials {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export const useGoogleSignup = () => {
  const [googleError, setGoogleError] = useState("");
  // const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const googleSignup = async (credentials: CredentialResponse) => {
    setGoogleError("");

    const userCredentials: DataCredentials = jwtDecode(credentials.credential!);
    const { name: username, email } = userCredentials;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/google-signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username }),
        }
      );
      if (response.ok) {
        toast.success("Google account registered successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        navigate("/login");
      } else {
        setGoogleError("Google Account already Registered.");
        googleLogout();
        console.log("Google user logged out");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return { googleSignup, googleError, setGoogleError };
};
