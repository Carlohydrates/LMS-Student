/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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

export const useGoogleLogin = () => {
  const [googleError, setGoogleError] = useState("");
  // const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const googleLogin = async (credentials: CredentialResponse) => {
    // setIsLoading(true);
    setGoogleError("");

    console.log(credentials);
    const userCredentials: DataCredentials = jwtDecode(credentials.credential!);
    const { name, email } = userCredentials;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_USER_API}/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        // Update the auth context
        const { user } = await response.json();
        dispatch({ type: "LOGIN", payload: user });

        console.log("User: ", user);

        // Set google credential as token
        localStorage.setItem("user", credentials.credential!);

        navigate("/dashboard");
      } else {
        toast.error("Google Account is not Registered");
        navigate("/signup")
        googleLogout();
        console.log("Google user logged out");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return { googleLogin, googleError };
};
