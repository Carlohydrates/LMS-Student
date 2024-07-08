import { useEffect, useState } from "react";
import { User } from "../../models/user";

export const useGetEnrollees = (courseId: string) => {
  const [enrollees, setEnrollees] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEnrollees = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_COURSE_API}/${courseId}/enrollees`,
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
        setEnrollees(data);
      } catch (error: any) {
        console.error("Error fetching enrollees:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getEnrollees();
  }, []);

  return { enrollees, error, loading };
};
