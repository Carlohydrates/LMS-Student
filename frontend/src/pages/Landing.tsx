import { useNavigate } from "react-router-dom";
import HeaderLoggedOut from "../components/HeaderLoggedOut";
import { Button } from "flowbite-react";
import { MoveRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen h-screen">
      <HeaderLoggedOut />

      <div className="flex-0 flex-col w-screen h-screen bg-[url('/peaks1.svg')] overflow-y-auto bg-no-repeat bg-cover bg-local scroll-smooth">
        <div className="flex-col w-2/3 h-1/2 p-10 ml-24 mt-24 poppins-semibold">
          <p className="flex text-6xl text-black_olive-200">
            Elevate Your Learning Experience: Dive into Knowledge with Course
            Dojo
          </p>
          <p className="flex text-3xl mt-6 text-black_olive-300">
            Explore a Diverse Range of Courses, Expand Your Knowledge Base, and
            Unlock New Opportunities.
          </p>
          <div className="inline-flex w-full items-baseline">
            <Button
              color={"secondary"}
              className="flex poppins-semibold w-1/6 mt-6"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <a
              href="#about"
              className="flex px-4 poppins-semibold text-sm text-snow hover:text-verdigris items-center"
            >
              Learn more <MoveRight size={18} className="inline-flex ml-2" />
            </a>
          </div>
        </div>
        <div
          className="flex w-3/4 h-1/2 p-10 ml-24 mt-96 poppins-semibold text-snow text-4xl"
          id="about"
        >
          Course Dojo is a dynamic online learning management system designed to
          empower educators in creating and delivering engaging course content
          to eager learners. Our platform offers a user-friendly interface,
          allowing instructors to effortlessly organize and share their
          materials.
        </div>
      </div>

      <div className="flex-1 flex-col w-screen h-screen bg-[url('/peaks2.svg')] bg-cover bg-no-repeat bg-center">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Landing;
