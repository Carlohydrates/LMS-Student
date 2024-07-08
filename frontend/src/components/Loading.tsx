import Lottie from "lottie-react";
import LoadingAnimation from "../../public/LoadingAnimation.json";

const Loading = () => {
  return (
    <div className="flex flex-col bg-black_olive items-center justify-center min-h-screen min-w-screen poppins-regular text-snow">
      Loading.. Please wait
      <Lottie animationData={LoadingAnimation} className="size-20"></Lottie>
    </div>
  );
};

export default Loading;
