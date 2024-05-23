import SignUpForm from "../components/SignUpForm";
import HeaderLoggedOut from "../components/HeaderLoggedOut";

const SignUp = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-[url('/stacked-peaks-haikei.svg')] overflow-y-auto bg-no-repeat bg-cover">
      <HeaderLoggedOut />
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignUp;
