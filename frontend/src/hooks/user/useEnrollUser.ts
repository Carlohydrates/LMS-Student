import { toast } from "react-toastify";
import { useGetCourses } from "../course/useGetCourses";

export const useEnrollUser = () => {
  const { triggerRefresh } = useGetCourses();
  const enrollUser = async (courseCode: string, username: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_COURSE_API}/${courseCode}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      if (res.ok) {
        toast.success("User enrolled successfully.");
        triggerRefresh();
      }
      if (!res.ok) {
        toast.error("Error enrolling course.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { enrollUser };
};
