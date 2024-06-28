import LoginForm from "../components/LoginForm";
import HeaderLoggedOut from "../components/HeaderLoggedOut";

const Login = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-[url('/peaks1.svg')] overflow-y-auto bg-no-repeat bg-cover">
      <HeaderLoggedOut />
      <LoginForm />
    </div>
  );
};

export default Login;
