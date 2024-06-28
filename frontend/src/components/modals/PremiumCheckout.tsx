import { Button, Modal } from "flowbite-react";
import { CircleCheck, ShoppingCart } from "lucide-react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpgradePremium } from "../../hooks/useUpgradeTier";
import { useGetPrice } from "../../hooks/tier/useGetPrice";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PremiumCheckout: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const { user } = useAuthContext();
  const { upgradePremium } = useUpgradePremium();
  const { price: premiumPrice } = useGetPrice(1);
  return (
    <Modal
      show={visible}
      size="lg"
      onClose={() => setVisible(false)}
    >
      <Modal.Header className="p-4">
        <ShoppingCart className="inline-flex align-bottom mx-2" />
        <div className="inline-flex">Checkout</div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col my-4 w-full h-auto items-center">
          <h1 className="poppins-semibold">Premium Tier</h1>
          <h2 className="poppins-semibold text-7xl">${premiumPrice}</h2>
          <div className="flex flex-col poppins-regular text-sm my-8">
            <div className="flex gap-2">
              <CircleCheck className="text-green-400" /> Access to free courses
            </div>
            <div className="flex gap-2">
              <CircleCheck className="text-green-400" /> Access to basic courses
            </div>
            <div className="flex gap-2">
              <CircleCheck className="text-green-400" /> Access to premium
              courses
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
              upgradePremium(user._id, 2, 1);
            }}
          >
            Proceed to Payment Site
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default PremiumCheckout;
