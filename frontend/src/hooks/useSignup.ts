/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("FAIL");
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        setIsLoading(true);
        throw new Error(errorData.error);
      }

      const { user, token } = await response.json();

      // Update the auth context
      dispatch({ type: "LOGIN", payload: user });

      navigate("/login");

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(true);
      setError(error.message);
    }
  };
  return {
    signup,
    isLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  };
};
