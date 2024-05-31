/* eslint-disable @typescript-eslint/no-unused-vars */
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { Carousel } from "flowbite-react";
import { useGetCourses } from "../hooks/useGetCourses";
import CourseCard from "../components/CourseCard";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

const Courses = () => {
  const { user } = useAuthContext();
  const { courses } = useGetCourses();
  return (
    <main className="flex flex-row w-full">
      <NavContext.Provider value={"courses"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />

          {courses && (
            <>
              <div className="flex mx-auto lg:mt-24 text-2xl text-snow poppins-semibold">
                All Courses
              </div>
              <div className="flex mx-auto my-auto lg:w-1/2 lg:h-2/3 rounded-xl poppins-semibold gap-4">
                <Carousel
                  pauseOnHover
                  slideInterval={7000}
                  className="w-full h-full rounded-xl mx-auto my-auto shadow-lg"
                  leftControl={
                    <ChevronsLeft size={32} className="hover:opacity-50" />
                  }
                  rightControl={
                    <ChevronsRight size={32} className="hover:opacity-50" />
                  }
                >
                  {
                  courses
                    .filter(
                      (course) =>
                        course.isPublished &&
                        !course.enrolled.includes(user._id)
                    )
                    .map((course) => (
                      <CourseCard
                        key={course._id}
                        code={course.code}
                        title={course.title}
                        description={course.description}
                        isPublished={course.isPublished}
                        tier={course.tier}
                        price={course.price}
                        enrolled={course.enrolled}
                      />
                    ))}
                </Carousel>
              </div>
            </>
          )}
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default Courses;
