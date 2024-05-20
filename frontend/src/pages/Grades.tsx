import SideNav from "../components/SideNav";
import Content from "../components/Content";
import { PageContext } from "../components/Context";

const Grades = () => {
  return (
    <main className="flex flex-row">
      <PageContext.Provider value={"grades"}>
        <SideNav />
        <Content />
      </PageContext.Provider>
    </main>
  );
};

export default Grades;
