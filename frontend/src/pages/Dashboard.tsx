import { Badge, Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Loading from "../components/Loading";
import DeleteAccount from "../components/modals/DeleteAccount";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetCourses } from "../hooks/course/useGetCourses";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetUserTier } from "../hooks/user/useGetUserTier";

function App() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { tier } = useGetUserTier(user._id);
  const [deleteModal, setDeleteModal] = useState(false);

  if (!user) {
    return <Loading />;
  }

  const { courses, error, loading } = useGetCourses();
  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const publishedCourses = courses.filter(
    (course) => course.isPublished && !course.enrolled.includes(user._id)
  );

  const enrolledCourses = courses.filter(
    (course) => course.isPublished && course.enrolled.includes(user._id)
  );

  return (
    <div className="flex flex-row w-full">
      <NavContext.Provider value={"dashboard"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive pb-20 text-black_olive">
          <HeaderLoggedIn />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center p-20">
            <div className="relative col-span-1 lg:col-span-2 bg-verdigris p-4 rounded-lg h-40 shadow-md shadow-black">
              <h2 className="text-4xl poppins-semibold">
                Welcome back, {user.username}.
              </h2>
              <h3 className="text-xl poppins-regular">{user.email}</h3>
              <Button
                color={"secondary"}
                className="absolute bottom-4 right-4"
                data-testid="delete-account"
                onClick={() => setDeleteModal(true)}
              >
                Delete Account
              </Button>
            </div>
            <div
              className="bg-verdigris p-4 rounded-lg h-40 shadow-md shadow-black hover:cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/coursecatalog")}
            >
              <h2 className="text-2xl poppins-regular">Available Courses</h2>
              <p className="text-5xl poppins-semibold">
                {publishedCourses.length}
              </p>
            </div>
            <div className="bg-verdigris p-4 rounded-lg h-40 shadow-md shadow-black hover:cursor-pointer"
            onClick={()=>navigate("/mycourses")}>
              <h2 className="text-2xl poppins-regular">Enrolled Courses</h2>
              <p className="text-5xl poppins-semibold">
                {enrolledCourses.length}
              </p>
            </div>
            <div className="relative bg-verdigris p-4 rounded-lg h-40 shadow-md shadow-black">
              <h2 className="text-2xl poppins-semibold">Current Tier</h2>
              <Badge
                className="flex size-fit poppins-semibold px-4 text-2xl mt-4"
                size={"2xl"}
                color={tier === 0 ? "pink" : tier === 1 ? "yellow" : "indigo"}
              >
                {tier === 0 ? "FREE" : tier === 1 ? "BASIC" : "PREMIUM"}
              </Badge>
              {tier! < 2 ? (
                <Button
                  color={"secondary"}
                  className="absolute bottom-4 right-4"
                  onClick={() => navigate("/pricing")}
                >
                  Upgrade Now
                </Button>
              ) : (
                <></>
              )}
            </div>
            <DeleteAccount visible={deleteModal} setVisible={setDeleteModal} />
          </div>
        </div>
      </NavContext.Provider>
    </div>
  );
}

export default App;
