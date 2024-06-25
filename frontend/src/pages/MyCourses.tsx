/* eslint-disable @typescript-eslint/no-unused-vars */
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useAuthContext } from "../hooks/useAuthContext";
import { Badge, Button, Spinner } from "flowbite-react";
import { useUnenrollUser } from "../hooks/user/useUnenrollUser";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { user } = useAuthContext();
  const { courses } = useGetCourses();
  const { unenrollUser } = useUnenrollUser();
  const navigate = useNavigate();
  return (
    <main className="flex flex-row">
      <NavContext.Provider value={"my courses"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />
          {courses ? (
            <>
              <div className="flex mx-auto lg:mt-24 text-2xl text-snow poppins-semibold">
                Enrolled Courses
              </div>
              <div className="flex flex-row flex-wrap gap-12 lg:w-full lg:h-full justify-center">
                {courses
                  .filter(
                    (course) =>
                      course.isPublished && course.enrolled.includes(user._id)
                  )
                  .map((course) => (
                    <div
                      key={course._id}
                      className="bg-[url('/peaks2.svg')] rounded-xl lg:w-[26rem] lg:h-80 text-snow poppins-regular p-7 hover:shadow-verdigris hover:shadow-md"
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
                      <h2 className="poppins-semibold-italic lg:text-lg text-verdigris">
                        {course.title}
                      </h2>
                      <div className="text-ellipsis overflow-hidden line-clamp-[6] text-justify h-30 w-full text-snow">
                        {course.description}
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Tempora voluptatem quibusdam dolorem, vero, eum
                        accusantium earum perspiciatis non dolore deserunt
                        nihil? Voluptatibus debitis inventore autem. Cum
                        deleniti quod aspernatur maxime!
                      </div>
                      <div className="inline-flex py-4 w-full justify-evenly">
                        <Button
                          className="bg-verdigris hover:bg-black-800"
                          onClick={() => navigate(`/courses/${course.code}`)}
                        >
                          View Course
                        </Button>
                        <Button
                          className="bg-black_olive"
                          onClick={() =>
                            unenrollUser(course.code, user.username)
                          }
                        >
                          Unenroll Course
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <Spinner size={"xl"}></Spinner>
          )}
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default MyCourses;
