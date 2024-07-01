import { Accordion, Table, Tabs } from "flowbite-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourse } from "../hooks/course/useGetCourse";
import { useGetEnrollees } from "../hooks/course/useGetEnrollees";
import { useAuthContext } from "../hooks/useAuthContext";
import { NotFoundPage } from "./NotFoundPage";

const CourseInfo = () => {
  const params = useParams();
  const { id: courseCode } = params;
  const { course, getCourse } = useGetCourse();
  const { enrollees, getEnrollees } = useGetEnrollees();
  const { user } = useAuthContext();

  useEffect(() => {
    if (courseCode) {
      getCourse(courseCode);
      getEnrollees(courseCode);
    }
  }, [courseCode]);

  if (!course) return <NotFoundPage />;

  if (enrollees) {
    // Check if the course is published and the user is enrolled
    const userEnrolled = enrollees.some(
      (enrollee) => enrollee._id === user._id
    );
    console.log(userEnrolled);
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
              <div className="flex flex-col border-solid border-2 border-verdigris lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <Tabs style="underline" className="bg-none rounded-xl border-b-0">
                  <Tabs.Item title="Overview">
                    <h1 className="poppins-extrabold lg:text-4xl text-snow">
                      {course.code}
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
                    <div className="lg:text-justify mt-10 text-verdigris">
                      <div>Course Description: </div>
                      {course.description}
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="People">
                    <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                      <Table hoverable>
                        <Table.Head>
                          <Table.HeadCell>Username</Table.HeadCell>
                          <Table.HeadCell>Email</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                          {enrollees &&
                            enrollees.map((enrollee) => (
                              <Table.Row key={enrollee._id}>
                                <Table.Cell>{enrollee.username}</Table.Cell>
                                <Table.Cell>{enrollee.email}</Table.Cell>
                              </Table.Row>
                            ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="Modules">
                    <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                      <Accordion collapseAll>
                        <Accordion.Panel>
                          <Accordion.Title>Module 1</Accordion.Title>
                          <Accordion.Content hidden>hidden</Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                          <Accordion.Title>Module 2</Accordion.Title>
                          <Accordion.Content></Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                          <Accordion.Title>Module 3</Accordion.Title>
                          <Accordion.Content></Accordion.Content>
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="Quizzes">
                    <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                      <h1 className="flex text-black_olive poppins-semibold text-xl p-4">
                        Quizzes
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
