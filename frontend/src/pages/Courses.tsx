import { Link } from "react-router-dom";
import Header from "../components/HeaderLoggedIn";
import Body from "../components/Body";
import SideNav from "../components/SideNav";
import Content from "../components/Content";
import { PageContext } from "../components/Context";

const Courses = () => {
  const courses: number[] = [1, 2, 3, 4, 5];
  return (
    <main className="flex flex-row">
      <PageContext.Provider value={"courses"}>
        <SideNav />
        <Content />
      </PageContext.Provider>
    </main>
  );
};

export default Courses;
