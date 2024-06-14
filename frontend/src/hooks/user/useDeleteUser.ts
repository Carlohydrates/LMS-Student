import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const useDeleteUser = () => {
  // courses
  //   .filter(
  //     (course) => course.enrolled.includes(user._id)
  //   )
  //   .map((course) => 
  //     unenrollUser(course.code, user.username)
  //   );
  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_USER_API}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        toast.warning("Account deleted successfully");
      }
      if (!res.ok) {
        toast.error("Error deleting user account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteUser };
};
