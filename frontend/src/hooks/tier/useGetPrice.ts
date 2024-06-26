import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetPrice = (tier: number) => {
  const [price, setPrice] = useState<number>();

  const fetchPrice = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TIER_API}/price?tier=${tier}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.ok) {
        toast.error("Error fetching premium tier price");
        return;
      }

      const data = await response.json();
      setPrice(data);
    } catch (error) {
      console.error("Error fetching tier price:", error);
    }
  };

  useEffect(() => {
    fetchPrice();
  });

  return { price };
};
