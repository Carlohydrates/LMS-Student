import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import SideNav from "../components/SideNav";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Spinner } from "flowbite-react";

function App() {
  const { user } = useAuthContext();
  if (!user) {
    return <Spinner size={"xl"}></Spinner>;
  }

  return (
    <div className="flex flex-row w-full">
      <NavContext.Provider value={"dashboard"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive pb-20 text-black_olive">
          <HeaderLoggedIn />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center p-20">
            <div className="relative col-span-1 lg:col-span-2 bg-verdigris p-4 rounded-lg h-40 shadow-lg shadow-black">
              <h2 className="text-4xl poppins-semibold">
                Welcome back, {user.username}.
              </h2>
              <h3 className="text-xl poppins-regular">{user.email}</h3>
              <Button color={"secondary"} className="absolute bottom-4 right-4">
                Delete Account
              </Button>
            </div>
            <div className="bg-verdigris p-4 rounded-lg h-40 shadow-lg shadow-black">
              <h2 className="text-2xl poppins-semibold">Total Courses</h2>
              <p>Content here...</p>
            </div>
            <div className="bg-verdigris p-4 rounded-lg h-40 shadow-lg shadow-black">
              <h2 className="text-2xl poppins-semibold">Enrolled Courses</h2>
              <p>Content here...</p>
            </div>
            <div className="bg-verdigris p-4 rounded-lg h-40 shadow-lg shadow-black">
              <h2 className="text-2xl poppins-semibold">Current Tier</h2>
              <p>Content here...</p>
            </div>
          </div>
        </div>
      </NavContext.Provider>
    </div>
  );
}

export default App;
