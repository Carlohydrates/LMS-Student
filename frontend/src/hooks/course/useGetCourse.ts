import { useEffect, useState } from "react";
import { Course } from "../../models/course";

export const useGetCourse = (courseId: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_COURSE_API}/${courseId}`,
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
        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [courseId]);

  return { course, error, loading };
};
