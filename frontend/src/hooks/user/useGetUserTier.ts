import { useEffect, useState } from "react";

export const useGetUserTier = (userId: string) => {
  const [tier, setTier] = useState();

  useEffect(() => {
    const getUserTier = async () => {
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
      }
    };
    getUserTier();
  }, [userId]);

  return { tier };
};
