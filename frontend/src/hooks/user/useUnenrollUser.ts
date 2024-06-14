import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useUnenrollUser = () => {
  const unenrollUser = async (courseCode: string, username: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_COURSE_API}/${courseCode}/unenroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      if (res.ok) {
        toast.success("User unenrolled successfully.");
        //
      }
      if (!res.ok) {
        toast.error("Error unenrolling course.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { unenrollUser };
};
