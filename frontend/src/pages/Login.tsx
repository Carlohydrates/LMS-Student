import LoginForm from "../components/LoginForm";
import HeaderLoggedOut from "../components/HeaderLoggedOut";

const Login = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-[url('/stacked-peaks-haikei.svg')] overflow-y-auto bg-no-repeat bg-cover">
      <HeaderLoggedOut />
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;
