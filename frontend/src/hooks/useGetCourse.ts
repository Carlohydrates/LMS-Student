/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Course } from "../models/course";
import { toast } from "react-toastify";

export const useGetCourse = () => {
  const [course, setCourse] = useState<Course>();
  const [error, setError] = useState<string | null>(null);

    const getCourse = async (courseId: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_COURSE_API}/${courseId}`, {
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
        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error.message);
        setError(error.message);
      }
    };

  return { getCourse, course, error };
};
