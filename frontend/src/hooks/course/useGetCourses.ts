import { useEffect, useState } from "react";
import { Course } from "../../models/course";

export const useGetCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
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
      }
    };

    getCourses();
  }, [refresh]);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return { courses, error, triggerRefresh };
};
