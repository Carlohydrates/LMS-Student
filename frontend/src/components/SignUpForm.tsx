/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleSignup } from "../hooks/useGoogleSignup";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const {
    signup,
    error,
    setError,
    isLoading,
    successMessage,
    setSuccessMessage,
  } = useSignup();
  const { googleSignup, googleError, setGoogleError } = useGoogleSignup();
  const signupUser = async (e: FormEvent) => {
    e.preventDefault();
    toast.dismiss();
    // Custom validation
    if (!email && !password) {
      toast.error("Please fill in all of the fields");
    } else if (!email) {
      toast.error("Email is required.");
    } else if (!username) {
      toast.error("Username is required.");
    } else if (!password) {
      toast.error("Password is required.");
    } else {
      await signup(email, username, password);
    }
  };

  useEffect(() => {
    if (error || googleError) {
      const toastError = error || googleError;
      toast.error(toastError);
      setError(null);
      setGoogleError("");
    }

    if (successMessage === "SUCCESS") {
      toast.success("Sign up successful.");
      setSuccessMessage("FAIL");
    }
  }, [error, googleError, successMessage]);

  return (
    <div className="flex lg:w-1/3 lg:h-3/4 shadow-lg shadow-black bg-snow rounded-xl my-auto mx-auto">
      <div className="flex mx-auto my-auto">
        <div className="flex flex-col mx-auto my-auto w-full sm:w-80 justify-center">
          <div className="flex w-full justify-center mb-14 poppins-extrabold text-4xl">
            Student Sign Up
          </div>
          <form
            className="flex lg:w-full flex-col gap-4"
            onSubmit={(e) => signupUser(e)}
          >
            <div className="lg:w-full w-1/2">
              <div className="mb-2 flex flex-col poppins-regular">
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
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
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
                SIGNUP
              </Button>
              <p className="poppins-regular text-sm text-center p-2">or</p>
              <div className="hover:shadow-inner mx-auto">
                <div className="w-full">
                  <GoogleLogin
                    text="signup_with"
                    onSuccess={async (credentialResponse) => {
                      googleSignup(credentialResponse);
                    }}
                    onError={() => console.log("Login with Google Failed")}
                  />
                </div>
              </div>
            </div>
          </form>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Slide}
            stacked={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
