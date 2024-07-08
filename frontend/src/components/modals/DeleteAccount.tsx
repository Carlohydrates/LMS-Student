import { Alert, Button, Modal } from "flowbite-react";
import { TriangleAlert } from "lucide-react";
import { useLogout } from "../../hooks/useLogout";
import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import { useAuthContext } from "../../hooks/useAuthContext";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccount: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const { user } = useAuthContext();
  const { deleteUser } = useDeleteUser();
  const { logout } = useLogout();
  return (
    <Modal show={visible} size="sm" onClose={() => setVisible(false)}>
      <Modal.Body>
        <div className="flex flex-col justify-center text-center items-center gap-10 p-2 poppins-semibold lg:text-2xl text-red-600">
          <Alert
            color="failure"
            icon={TriangleAlert}
            className="poppins-extrabold"
          >
            WARNING: You are about to delete your account. This process is irreversible!
          </Alert>
          <div className="flex flex-row gap-4 lg:text-lg">
            <Button
              data-testid="proceed"
              color="failure"
              onClick={() => {
                deleteUser(user._id);
                logout();
                setVisible(false);
              }}
            >
              Proceed
            </Button>
            <Button data-testid="cancel" onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAccount;
