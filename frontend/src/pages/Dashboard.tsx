import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import SideNav from "../components/SideNav";
import { useAuthContext } from "../hooks/useAuthContext";
import { Spinner } from "flowbite-react";

function App() {
  const { user } = useAuthContext();
  if (!user) {
    return <Spinner size={"xl"}></Spinner>;
  }
  return (
    <div className="flex flex-row w-full">
      <NavContext.Provider value={"dashboard"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />

        </div>
      </NavContext.Provider>
    </div>
  );
  //
}

export default App;
