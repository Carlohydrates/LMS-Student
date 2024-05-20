import Content from "../components/Content";
import { PageContext } from "../components/Context";
import Header from "../components/HeaderLoggedIn";
import SideNav from "../components/SideNav";
import { useAuthContext } from "../hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  if (!user) {
    return <>Loading...</>;
  }
  return (
    <div className="flex flex-row w-full">
      <PageContext.Provider value={"dashboard"}>
        <SideNav />
        <div className="flex flex-col w-screen h-screen overflow-hidden">
          <Header />
          <Content />
        </div>
      </PageContext.Provider>
    </div>
  );
  //
}

export default App;
