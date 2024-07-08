import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const HeaderLoggedOut = () => {
  const navigate = useNavigate();
  return (
    <div className="flex sticky top-0 h-16 w-full bg-black_olive py-4 px-4 justify-between">
      <img
        src="/LMS-LOGO.png"
        alt="LMS logo"
        className="flex h-10 hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex text-center items-center">
        <button
          data-testid="login-page"
          className="flex poppins-regular p-5 text-sm hover:underline text-snow"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <Button
          data-testid="signup-page"
          color={"primary"}
          className="flex bg-verdigris-500 poppins-semibold py-0"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default HeaderLoggedOut;
