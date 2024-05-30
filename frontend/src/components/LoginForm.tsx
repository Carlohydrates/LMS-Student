/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleLogin } from "@react-oauth/google";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isLoading } = useLogin();
  const { googleLogin, googleError } = useGoogleLogin();
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    toast.dismiss();
    // Custom validation
    if (!email && !password) {
      toast.error("Please fill in all of the fields");
    } else if (!email) {
      toast.error("Email is required.");
      return;
    } else if (!password) {
      toast.error("Password is required.");
      return;
    } else {
      await login(email, password);
    }
  };

  // const toastNotification = () => {
  //   const toastMessage = error || googleError || null;
  //   if (toastMessage) {
  //     toast.error(toastMessage);
  //   }
  // };

  // useEffect(() => {
  //   if (error || googleError) {
  //     toastNotification();
  //   }
  // }, [error, googleError]);

  return (
    <div className="flex lg:w-1/3 lg:h-3/4 shadow-lg shadow-black bg-snow rounded-xl my-auto mx-auto">
      <div className="flex mx-auto my-auto">
        <div className="flex flex-col mx-auto my-auto w-full sm:w-80 justify-center">
          <div className="flex w-full justify-center mb-20 poppins-extrabold text-4xl">
            Student Login
          </div>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={(e) => loginUser(e)}
          >
            <div className="">
              <div className="flex flex-col poppins-regular">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                shadow
              />
            </div>
            <div>
              <div className="mb-2 flex flex-col poppins-regular">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                shadow
              />
            </div>
            <div className="flex flex-col mx-auto w-full">
              <Button
                type="submit"
                // disabled={isLoading!}
                className="bg-verdigris-500"
              >
                LOGIN
              </Button>
              <p className="poppins-regular text-sm text-center p-2">or</p>
              <div className="hover:shadow-inner mx-auto">
                <div className="w-full">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      googleLogin(credentialResponse);
                    }}
                    onError={() => console.log("Login with Google Failed")}
                  />
                </div>
              </div>
              <p className="poppins-regular text-sm text-center p-3">
                No account yet?{" "}
                <a
                  href="/signup"
                  className="poppins-regular-italic text-verdigris-200 hover:underline hover:text-verdigris-400"
                >
                  Register now.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
