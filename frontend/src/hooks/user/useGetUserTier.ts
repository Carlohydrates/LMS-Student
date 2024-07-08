import { useEffect, useState } from "react";

export const useGetUserTier = (userId: string) => {
  const [tier, setTier] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserTier = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_USER_API}/${userId}/tier`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        setTier(data.tier);
      } catch (error: any) {
        console.error("Error fetching user tier:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserTier();
  }, [userId]);

  return { tier, loading, error };
};
