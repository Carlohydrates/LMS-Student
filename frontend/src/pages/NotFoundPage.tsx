import Lottie from "lottie-react";
import NotFoundAnimation from "../../public/NotFoundAnimation.json";

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center bg-verdigris w-screen h-screen text-black flex-col space-y-4">
        <Lottie animationData={NotFoundAnimation} className="w-1/2 h-1/2"></Lottie>
    </div>
  );
};
