/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { NavContext } from "../context/NavContext";
import SideNav from "../components/SideNav";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { useGetCourse } from "../hooks/useGetCourse";
import { useEffect, useState } from "react";
import { Accordion, Modal, Table, Button } from "flowbite-react";
import { Trash2 } from "lucide-react";
import { useUnenrollUser } from "../hooks/useUnenrollUser";
import { useGetEnrollees } from "../hooks/useGetEnrollees";
import { NotFoundPage } from "./NotFoundPage";
import { useAuthContext } from "../hooks/useAuthContext";

const CourseInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
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
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600">
          <HeaderLoggedIn />

          {course && (
            <>
              <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <h1 className="poppins-extrabold lg:text-4xl text-verdigris">
                  {course.code}
                </h1>
                <h2 className="poppins-semibold lg:text-2xl text-verdigris">
                  {course.title}
                </h2>
                <h3 className="poppins-semibold-italic lg:text-sm text-black_olive">
                  Publisher:{"  "}
                  <span className="poppins-regular-italic">
                    {course.publisher}
                  </span>
                </h3>
                <div className="lg:text-justify mt-10">
                  <div>Course Description: </div>
                  {course.description}
                </div>
              </div>
              <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <h1 className="flex poppins-semibold text-xl p-4">People</h1>
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

              <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <h1 className="flex poppins-semibold text-xl p-4">Modules</h1>
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

              <div className="flex flex-col bg-snow lg:w-11/12 mx-auto min-h-fit p-4 pb-12 rounded-lg my-10 poppins-regular gap-4">
                <h1 className="flex poppins-semibold text-xl p-4">Quizzes</h1>
              </div>
            </>
          )}
        </div>
      </NavContext.Provider>
    </div>
  );
};

export default CourseInfo;
