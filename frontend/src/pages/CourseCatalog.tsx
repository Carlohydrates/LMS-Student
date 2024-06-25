import CourseCard from "../components/CourseCard";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useAuthContext } from "../hooks/useAuthContext";

const Courses = () => {
  const { user } = useAuthContext();
  const { courses } = useGetCourses();

  return (
    <main className="flex flex-row w-full">
      <NavContext.Provider value={"course catalog"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />

          {courses ? (
            <>
              <div className="mx-auto lg:mt-24 text-2xl text-snow poppins-semibold">
                All Courses
              </div>
              <div className="flex flex-row flex-wrap gap-12 lg:w-full lg:h-full justify-center">
                {courses
                  .filter(
                    (course) =>
                      course.isPublished && !course.enrolled.includes(user._id)
                  )
                  .map((course) => (
                    <CourseCard
                      key={course._id}
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
