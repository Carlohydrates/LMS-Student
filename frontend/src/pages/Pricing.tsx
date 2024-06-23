/* eslint-disable @typescript-eslint/no-unused-vars */
import SideNav from "../components/SideNav";
import { NavContext } from "../context/NavContext";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { Button, Card, Modal, Table, TableCell } from "flowbite-react";
import { CircleCheck, ShoppingCart } from "lucide-react";
import { useGetPrice } from "../hooks/premium/useGetPrice";
import { useEffect, useState } from "react";
import { useUpgradePremium } from "../hooks/useUpgradePremium";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { price } = useGetPrice();
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { upgradePremium } = useUpgradePremium();
  const { user } = useAuthContext();
  const navigate = useNavigate();
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
            <div className="flex flex-row justify-evenly gap-4 p-4">
              <Card className="flex w-[30rem] h-[35rem] text-center">
                <h1 className="poppins-semibold text-4xl">FREE</h1>
                <p className="poppins-regular text-2xl">$ 0</p>
                <p className="poppins-regular text-sm">
                  Get started right away with access to free courses
                </p>
              </Card>
              <Card className="flex w-[30rem] h-[35rem] text-center">
                <h1 className="poppins-semibold text-4xl">PREMIUM</h1>
                <p className="poppins-regular text-2xl">$ {price}</p>
                <p className="poppins-regular text-sm">
                  Step up your learning with access to premium courses and more
                </p>
                <Button
                  outline
                  className="flex size-fit self-center my-8 poppins-semibold"
                  onClick={() => setCheckoutModal(true)}
                >
                  Upgrade to Premium
                </Button>
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
              onClose={() => {
                localStorage.removeItem("transactionToken");
                setSuccessModal(false);
              }}
            >
              <Modal.Header>Payment Successful</Modal.Header>
              <Modal.Body>
                <p>Thank you for your purchase!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    localStorage.removeItem("transactionToken");
                    setSuccessModal(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="lg:w-11/12 h-full mx-auto my-12">
              <h1 className="poppins-semibold text-snow text-2xl">Features</h1>
              <Table className="bg-snow rounded-lg poppins-regular">
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
