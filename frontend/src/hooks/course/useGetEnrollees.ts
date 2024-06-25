import { useState } from "react";
import { User } from "../../models/user";

export const useGetEnrollees = () => {
  const [enrollees, setEnrollees] = useState<User[]>();
  const [error, setError] = useState<string | null>(null);

  const getEnrollees = async (courseId: string) => {
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
      console.error("Error fetching courses:", error.message);
      setError(error.message);
    }
  };

  return { getEnrollees, enrollees, error };
};
