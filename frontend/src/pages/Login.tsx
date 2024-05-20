import LoginForm from "../components/LoginForm";
import HeaderLoggedOut from "../components/HeaderLoggedOut";

const Login = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-[url('/stacked-peaks-haikei.svg')] overflow-y-auto bg-no-repeat bg-cover">
      <HeaderLoggedOut />
      <div className="flex w-1/3 h-3/4 shadow-lg shadow-black bg-snow rounded-xl my-auto mx-auto">
        <div className="flex mx-auto my-auto">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
