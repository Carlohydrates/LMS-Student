/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_USER_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        setIsLoading(true);
        throw new Error(errorData.error);
      }

      const { user, token } = await response.json();

      // Save token to local storage
      localStorage.setItem("user", token);

      // Update the auth context
      dispatch({ type: "LOGIN", payload: user });

      navigate("/dashboard");

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(true);
      setError(error.message);
    }
  };

  return { login, isLoading, error };
};
