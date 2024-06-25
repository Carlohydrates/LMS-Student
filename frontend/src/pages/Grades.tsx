import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";

const Grades = () => {
  return (
    <main className="flex flex-row">
      <NavContext.Provider value={"grades"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default Grades;
