import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_USER_API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        const { user } = await response.json();

        // Update the auth context
        dispatch({ type: "LOGIN", payload: user });

        navigate("/login");
        toast.success("Sign up successful.");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    signup,
    isLoading,
    error,
  };
};
