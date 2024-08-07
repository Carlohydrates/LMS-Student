import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleSignup } from "../hooks/useGoogleSignup";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { signup, isLoading, error } = useSignup();
  const { googleSignup } = useGoogleSignup();
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
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex size-fit py-8 px-12 shadow-lg shadow-black bg-snow rounded-xl">
      <div className="flex mx-auto my-auto">
        <div className="flex flex-col mx-auto my-auto w-full sm:w-80 justify-center">
          <div className="flex w-full justify-center p-4">
            <img
              src="/LMS-LOGO.png"
              alt="LMS logo"
              className="flex w-full h-20 hover:cursor-pointer"
            />
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
                data-testid="email-register-field"
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
                data-testid="name-register-field"
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
                data-testid="password-register-field"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                shadow
              />
            </div>
            <div className="flex flex-col mx-auto w-full">
              <Button
                data-testid="register-button"
                type="submit"
                disabled={isLoading!}
                className="bg-verdigris-500"
              >
                { isLoading ? "Signing up..." : "SIGNUP ACCOUNT" }
              </Button>
              <div className="flex items-center p-2">
                <div className="flex-grow bg-black_olive h-[0.05rem]"></div>
                <div className="px-2">or</div>
                <div className="flex-grow bg-black_olive h-[0.05rem]"></div>
              </div>
              <div className="hover:shadow-inner mx-auto">
                <div className="w-full">
                  <GoogleLogin
                    data-testid="google-register-button"
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
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
