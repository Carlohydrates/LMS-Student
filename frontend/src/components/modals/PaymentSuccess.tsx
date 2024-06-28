import { Button, Modal } from "flowbite-react";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentSuccess: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={visible}
      size={"md"}
      onClose={() => {
        localStorage.removeItem("transactionToken");
        setVisible(false);
      }}
    >
      <Modal.Header>
        <div className="flex gap-2 items-center text-green-400">
          Payment Successful!
          <CircleCheck className="text-green-400" />
        </div>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-4 text-center">
        <div className="poppins-regular">Thank you for your purchase!</div>
        <Button
          onClick={() => {
            localStorage.removeItem("transactionToken");
            setVisible(false);
            navigate("/coursecatalog");
          }}
          className="size-fit self-center"
          color={"success"}
          data-testid="purchase-tier-2"
        >
          Go to Courses
        </Button>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default PaymentSuccess;
