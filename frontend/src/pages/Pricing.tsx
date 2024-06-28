import { Alert, Button, Card } from "flowbite-react";
import { CircleCheck, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import BasicCheckout from "../components/modals/BasicCheckout";
import PaymentSuccess from "../components/modals/PaymentSuccess";
import PremiumCheckout from "../components/modals/PremiumCheckout";
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import { useGetPrice } from "../hooks/tier/useGetPrice";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetUserTier } from "../hooks/user/useGetUserTier";

const Pricing = () => {
  const { price: basicPrice } = useGetPrice(1);
  const { price: premiumPrice } = useGetPrice(2);
  const [basicCheckout, setBasicCheckout] = useState(false);
  const [premiumCheckout, setPremiumCheckout] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { tier: userTier } = useGetUserTier(user._id);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionStatus = queryParams.get("transaction");
    const token = queryParams.get("token");
    const storedToken = localStorage.getItem("transactionToken");
    if (!storedToken) {
      navigate(location.pathname, { replace: true });
    }
    if (transactionStatus === "success" && storedToken === token) {
      setSuccessModal(true);
    }
    if (queryParams.get("transaction") === "cancelled") {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <main
      className={`flex flex-row ${
        basicCheckout || premiumCheckout || successModal
          ? "blur-sm"
          : "blur-none"
      }`}
    >
      <NavContext.Provider value={"pricing"}>
        <SideNav />
      </NavContext.Provider>
      <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive pb-20">
        <HeaderLoggedIn />
        <div className="lg:w-11/12 h-full mx-auto">
          <div className="flex justify-center p-8 text-2xl text-snow poppins-semibold">
            Pricing
          </div>
          <div className="flex flex-row justify-center gap-4 p-4">
            <Card className="relative flex flex-col w-[28rem] h-[30rem] text-center justify-center items-center bg-verdigris-900 hover:shadow-black hover:shadow-lg transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150">
              {userTier === 0 ? (
                <Alert
                  color={"warning"}
                  icon={Info}
                  className="absolute top-0 left-0 py-2 px-12 poppins-semibold shadow-sm shadow-black"
                >
                  Current Tier
                </Alert>
              ) : (
                ""
              )}
              <div className="flex flex-col items-center w-full mt-[5rem] text-black_olive gap-2">
                <h1 className="poppins-semibold text-4xl">FREE</h1>
                <p className="poppins-regular text-3xl">$0</p>
                <p className="poppins-regular text-sm">
                  Get started right away with access to free courses.
                </p>
                <div className="flex flex-col poppins-regular text-sm p-4">
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to free
                    courses
                  </div>
                </div>
              </div>
              <div className="flex w-full h-full justify-center"></div>
            </Card>
            <Card className="relative flex flex-col w-[28rem] h-[30rem] text-center justify-center items-center bg-verdigris-900 hover:shadow-black hover:shadow-lg transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150">
              {userTier === 1 ? (
                <Alert
                  color={"warning"}
                  icon={Info}
                  className="absolute top-0 left-0 py-2 px-12 poppins-semibold shadow-sm shadow-black"
                >
                  Current Tier
                </Alert>
              ) : (
                ""
              )}
              <div className="flex flex-col items-center w-full mt-[5rem] text-black_olive gap-2">
                <h1 className="poppins-semibold text-4xl">BASIC</h1>
                <p className="poppins-regular text-3xl">${basicPrice}</p>
                <p className="poppins-regular text-sm">
                  Recommended for the average learner.
                </p>
                <div className="flex flex-col poppins-regular text-sm p-4">
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to free
                    courses
                  </div>
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to basic
                    courses
                  </div>
                </div>
              </div>
              <div className="flex w-full h-full justify-center">
                {userTier! < 1 ? (
                  <Button
                    outline
                    className="size-fit self-start poppins-semibold"
                    onClick={() => setBasicCheckout(true)}
                  >
                    Upgrade to Basic
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Card>
            <Card className="relative flex flex-col w-[28rem] h-[30rem] text-center justify-center items-center bg-verdigris-900 hover:shadow-black hover:shadow-lg transition-all ease-in-out hover:-translate-y-2 duration-200 delay-150">
              {userTier === 2 ? (
                <Alert
                  color={"warning"}
                  icon={Info}
                  className="absolute top-0 left-0 py-2 px-12 poppins-semibold shadow-sm shadow-black"
                >
                  Current Tier
                </Alert>
              ) : (
                ""
              )}
              <div className="flex flex-col items-center w-full mt-[5rem] text-black_olive gap-2">
                <h1 className="poppins-semibold text-4xl">PREMIUM</h1>
                <p className="poppins-regular text-3xl">${premiumPrice}</p>
                <p className="poppins-regular text-sm">
                  Step up your learning with access to premium courses and more.
                </p>
                <div className="flex flex-col poppins-regular text-sm p-4">
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to free
                    courses
                  </div>
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to basic
                    courses
                  </div>
                  <div className="flex gap-2">
                    <CircleCheck className="text-black_olive" /> Access to
                    premium courses
                  </div>
                </div>
              </div>
              <div className="flex w-full h-full justify-center">
                {userTier! < 2 ? (
                  <Button
                    outline
                    className="size-fit self-start poppins-semibold"
                    onClick={() => setPremiumCheckout(true)}
                  >
                    Upgrade to Premium
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Card>
          </div>

          {/* Modals */}
          <BasicCheckout
            visible={basicCheckout}
            setVisible={setBasicCheckout}
          />
          <PremiumCheckout
            visible={premiumCheckout}
            setVisible={setPremiumCheckout}
          />
          <PaymentSuccess visible={successModal} setVisible={setSuccessModal} />
        </div>
      </div>
    </main>
  );
};

export default Pricing;
