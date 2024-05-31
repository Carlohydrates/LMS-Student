import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useEnrollUser = () => {
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
        //
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
