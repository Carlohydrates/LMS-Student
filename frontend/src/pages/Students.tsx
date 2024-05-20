import SideNav from "../components/SideNav";
import Content from "../components/Content";
import { PageContext } from "../components/Context";

const Students = () => {
  return (
    <main className="flex flex-row">
      <PageContext.Provider value={"students"}>
        <SideNav />
        <Content />
      </PageContext.Provider>
    </main>
  );
};

export default Students;
