import { Button, Table, Tabs } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Loading from "../components/Loading";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourse } from "../hooks/course/useGetCourse";
import { useGetEnrollees } from "../hooks/course/useGetEnrollees";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUnenrollUser } from "../hooks/user/useUnenrollUser";
import CourseModules from "./CourseModules";
import { NotFoundPage } from "./NotFoundPage";

const CourseInfo = () => {
  const params = useParams();
  const { id: courseCode } = params;
  const {
    course,
    loading: loadingCourses,
    error: coursesError,
  } = useGetCourse(courseCode!);
  const {
    enrollees,
    loading: loadingEnrollees,
    error: enrolleesError,
  } = useGetEnrollees(courseCode!);
  const { user } = useAuthContext();
  const { unenrollUser } = useUnenrollUser();
  const navigate = useNavigate();

  if (loadingCourses || loadingEnrollees) {
    return <Loading />;
  }
  
  if (coursesError) {
    toast.error(coursesError);
  }
  if (enrolleesError) {
    toast.error(enrolleesError);
  }
  
  if (!course) {
    return <NotFoundPage />;
  } 

  if (enrollees && course) {
    // Check if the course is published and the user is enrolled
    const userEnrolled = enrollees.some(
      (enrollee) => enrollee._id === user._id
    );
    if (!course.isPublished || !userEnrolled) {
      return <NotFoundPage />;
    }
  }

  return (
    <div className="flex flex-row w-full">
      <NavContext.Provider value={"my courses"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive">
          <HeaderLoggedIn />

          {course && (
            <>
              <div className="flex flex-col lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <Tabs style="underline">
                  <Tabs.Item title="Overview">
                    <h1 className="poppins-extrabold lg:text-4xl text-snow">
                      {course.code}
                      <Button
                        className="my-2 flex float-end"
                        color={"primary"}
                        onClick={async () => {
                          await unenrollUser(course.code, user.username);
                          navigate("/mycourses");
                        }}
                      >
                        Unenroll Course
                      </Button>
                    </h1>
                    <h2 className="poppins-semibold lg:text-2xl text-snow">
                      {course.title}
                    </h2>
                    <h3 className="poppins-semibold-italic lg:text-sm text-black_olive">
                      Publisher:{"  "}
                      <span className="poppins-regular-italic">
                        {course.publisher}
                      </span>
                    </h3>
                    <div className="lg:text-justify mt-10 text-snow gap-4 flex flex-col">
                      <div className="text-lg">Course Description </div>
                      {course.description}
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="People">
                    <div className="flex flex-col bg-black_olive lg:w-full mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                      <Table
                        hoverable
                        className="bg-black_olive border-snow border text-snow"
                      >
                        <Table.Head>
                          <Table.HeadCell className="bg-black_olive border-snow border text-snow">
                            Username
                          </Table.HeadCell>
                          <Table.HeadCell className="bg-black_olive border-snow border text-snow">
                            Email
                          </Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {enrollees &&
                            enrollees.map((enrollee) => (
                              <Table.Row
                                key={enrollee._id}
                                className="hover:bg-black_olive-600"
                              >
                                <Table.Cell>{enrollee.username}</Table.Cell>
                                <Table.Cell>{enrollee.email}</Table.Cell>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="Modules">
                    <CourseModules courseCode={course.code} />
                  </Tabs.Item>
                  <Tabs.Item title="Quizzes">
                    <div className="flex flex-col border-snow lg:w-full mx-auto min-h-fit p-4 pb-12 rounded-lg  poppins-regular gap-4">
                      <h1 className="flex text-snow poppins-semibold text-xl p-4">
                        No Quizzes Available
                      </h1>
                    </div>
                  </Tabs.Item>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </NavContext.Provider>
    </div>
  );
};

export default CourseInfo;
