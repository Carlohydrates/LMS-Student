/* eslint-disable @typescript-eslint/no-unused-vars */
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { Alert, Button, Card, Modal, Table, TableCell } from "flowbite-react";
import { CircleCheck, Info, ShoppingCart } from "lucide-react";
import { useGetPrice } from "../hooks/premium/useGetPrice";
import { useEffect, useState } from "react";
import { useUpgradePremium } from "../hooks/useUpgradePremium";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useGetUserTier } from "../hooks/user/useGetUserTier";

const Pricing = () => {
  const { price } = useGetPrice();
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { upgradePremium } = useUpgradePremium();
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
    <main className="flex flex-row">
      <NavContext.Provider value={"pricing"}>
        <SideNav />
        <div className="flex flex-col lg:w-screen lg:h-screen overflow-y-auto bg-black_olive-600 pb-20">
          <HeaderLoggedIn />
          <div className="lg:w-11/12 h-full mx-auto my-12">
            <div className="flex justify-center lg:mt-24 text-2xl text-snow poppins-semibold">
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
                <div className="flex flex-col items-center w-full mt-[10rem] text-black_olive">
                  <h1 className="poppins-semibold text-4xl">FREE</h1>
                  <p className="poppins-regular text-3xl">$0</p>
                  <p className="poppins-regular text-sm">
                    Get started right away with access to free courses.
                  </p>
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
                <div className="flex flex-col items-center w-full mt-[10rem] text-black_olive">
                  <h1 className="poppins-semibold text-4xl">PREMIUM</h1>
                  <p className="poppins-regular text-3xl">${price}</p>
                  <p className="poppins-regular text-sm">
                    Step up your learning with access to premium courses and
                    more.
                  </p>
                </div>
                <div className="flex w-full h-full justify-center">
                  {userTier !== 1 ? (
                    <Button
                      outline
                      className="size-fit self-start poppins-semibold"
                      onClick={() => setCheckoutModal(true)}
                    >
                      Upgrade to Premium
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </div>

            <Modal
              show={checkoutModal}
              size="lg"
              onClose={() => setCheckoutModal(false)}
            >
              <Modal.Header className="p-4">
                <ShoppingCart className="inline-flex align-bottom mx-2" />
                <div className="inline-flex">Checkout</div>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col my-4 w-full h-auto items-center">
                  <h1 className="poppins-semibold">Premium Tier</h1>
                  <h2 className="poppins-semibold text-7xl">${price}</h2>
                  <div className="flex flex-col poppins-regular text-sm my-8">
                    <div className="flex gap-2">
                      <CircleCheck className="text-green-400" /> Access to free
                      courses
                    </div>
                    <div className="flex gap-2">
                      <CircleCheck className="text-green-400" /> Access to
                      premium courses
                    </div>
                  </div>
                  <div className="poppins-regular-italic text-xs p-1 text-center w-42">
                    By selecting "
                    <span className="poppins-semibold-italic">
                      Proceed to Payment Site
                    </span>
                    ", you will be redirected to an external merchant.
                  </div>
                  <Button
                    outline
                    className="m-2 w-2/3 poppins-semibold"
                    color={"success"}
                    onClick={async () => {
                      upgradePremium(user._id, 1, 1);
                    }}
                  >
                    Proceed to Payment Site
                  </Button>
                </div>
              </Modal.Body>
              <Modal.Footer />
            </Modal>

            <Modal
              show={successModal}
              size={"md"}
              onClose={() => {
                localStorage.removeItem("transactionToken");
                setSuccessModal(false);
              }}
            >
              <Modal.Header>
                <div className="flex gap-2 items-center text-green-400">
                  Payment Successful!
                  <CircleCheck className="text-green-400" />
                </div>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-4 text-center">
                <div className="poppins-regular">
                  Thank you for your purchase!
                </div>
                <Button
                  onClick={() => {
                    localStorage.removeItem("transactionToken");
                    setSuccessModal(false);
                    navigate("/coursecatalog");
                  }}
                  className="size-fit self-center"
                  color={"success"}
                >
                  Go to Courses
                </Button>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>

            <div className="lg:w-11/12 h-full mx-auto my-12">
              <h1 className="poppins-semibold text-snow text-2xl flex justify-center">Features</h1>
              <Table hoverable className="bg-snow rounded-lg poppins-regular">
                <Table.Head>
                  <Table.HeadCell></Table.HeadCell>
                  <Table.HeadCell>FREE TIER</Table.HeadCell>
                  <Table.HeadCell>PREMIUM TIER</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <TableCell>Access to free courses</TableCell>
                    <TableCell>
                      <CircleCheck className="text-green-400" />
                    </TableCell>
                    <TableCell>
                      <CircleCheck className="text-green-400" />
                    </TableCell>
                  </Table.Row>
                  <Table.Row>
                    <TableCell>Access to premium courses</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <CircleCheck className="text-green-400" />
                    </TableCell>
                  </Table.Row>
                  <Table.Row>
                    <TableCell>Unlimited practice questions</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <CircleCheck className="text-green-400" />
                    </TableCell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </NavContext.Provider>
    </main>
  );
};

export default Pricing;
