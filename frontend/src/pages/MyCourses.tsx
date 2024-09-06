import { Badge, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Loading from "../components/Loading";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useAuthContext } from "../hooks/useAuthContext";

const MyCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { courses, loading, error } = useGetCourses();

  if (error) {
    toast.error(error);
  }

  return (
    <main className="flex flex-row">
      <NavContext.Provider value={"my courses"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive pb-20">
          <HeaderLoggedIn />
          {loading ? (
            <Loading />
          ) : courses ? (
            <>
              <div className="flex mx-auto p-8 text-2xl text-snow poppins-semibold">
                Enrolled Courses
              </div>
              <div className="flex flex-row flex-wrap gap-4 lg:w-full lg:h-full justify-center">
                {courses
                  .filter(
                    (course) =>
                      course.isPublished && course.enrolled.includes(user._id)
                  )
                  .map((course) => (
                    <div
                      key={course._id}
                      className="bg-verdigris rounded-xl lg:w-[26rem] lg:h-80 text-black_olive poppins-regular p-7 hover:shadow-black hover:shadow-lg hover:cursor-pointer transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150"
                    >
                      <h1 className="w-full h-10 poppins-extrabold justify-between">
                        <div className="flex justify-between items-start lg:text-3xl">
                          {course.code}
                          <Badge
                            className="inline-flex size-fit"
                            size={"sm"}
                            color={course.tier === 0 ? "pink" : "indigo"}
                          >
                            {course.tier === 0 ? "FREE" : "PREMIUM"}
                          </Badge>
                        </div>
                      </h1>
                      <h2 className="poppins-semibold-italic lg:text-lg text-black_olive">
                        {course.title}
                      </h2>
                      <div className="text-ellipsis overflow-hidden line-clamp-[6] text-justify h-30 w-full text-black_olive">
                        {course.description}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Tempora voluptatem quibusdam dolorem, vero, eum
                        accusantium earum perspiciatis non dolore deserunt
                        nihil? Voluptatibus debitis inventore autem. Cum
                        deleniti quod aspernatur maxime!
                      </div>
                      <div className="inline-flex py-4 w-full justify-evenly">
                        <Button
                          color={"secondary"}
                          onClick={() => navigate(`/courses/${course.code}`)}
                          data-testid={`course-${course._id}`}
                        >
                          View Course
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="mx-auto lg:mt-24 text-2xl text-snow poppins-semibold">
              No Courses Enrolled...
            </div>
          )}
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default MyCourses;
