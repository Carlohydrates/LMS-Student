import { useEffect, useState } from "react";
import { Course } from "../../models/course";

export const useGetCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const response = await fetch(`${import.meta.env.VITE_COURSE_API}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error: any) {
        console.error("Error fetching courses:", error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    getCourses();
  }, []);

  return { courses, error, loading };
};
