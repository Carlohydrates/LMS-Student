import { toast } from "react-toastify";
import CourseCard from "../components/CourseCard";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Loading from "../components/Loading";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetUserTier } from "../hooks/user/useGetUserTier";

const Courses = () => {
  const { user } = useAuthContext();
  const { courses } = useGetCourses();
  const { tier: userTier, loading, error } = useGetUserTier(user._id);

  if (error) {
    toast.error(error);
  }

  return (
    <main className="flex flex-row w-full">
      <NavContext.Provider value={"course catalog"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive pb-20">
          <HeaderLoggedIn />
          {loading ? (
            <Loading />
          ) : courses ? (
            <>
              <div className="flex mx-auto p-8 text-2xl text-snow poppins-semibold">
                All Courses
              </div>
              <div className="flex flex-row flex-wrap gap-4 lg:w-full lg:h-full justify-center">
                {courses
                  .filter(
                    (course) =>
                      course.isPublished && !course.enrolled.includes(user._id)
                  )
                  .map((course) => (
                    <CourseCard
                      key={course._id}
                      userTier={userTier!}
                      code={course.code}
                      title={course.title}
                      description={course.description}
                      isPublished={course.isPublished}
                      publisher={course.publisher}
                      tier={course.tier}
                      price={course.price}
                      enrolled={course.enrolled}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="mx-auto lg:mt-24 text-2xl text-snow poppins-semibold">
              No Courses Available...
            </div>
          )}
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default Courses;
