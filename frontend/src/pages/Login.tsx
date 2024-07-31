import LoginForm from "../components/LoginForm";
import HeaderLoggedOut from "../components/HeaderLoggedOut";
import OnlineLearningAnimation from "../../public/OnlineLearningAnimation.json";
import Lottie from "lottie-react";

const Login = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-[url('/peaks1.svg')] overflow-y-hidden bg-no-repeat bg-cover">
      <HeaderLoggedOut />
      <div className="flex relative mx-52 my-auto">
        <LoginForm />
        <Lottie
          animationData={OnlineLearningAnimation}
          className="absolute -bottom-36 left-[28rem] size-[50rem]"
        ></Lottie>
      </div>
    </div>
  );
};

export default Login;
