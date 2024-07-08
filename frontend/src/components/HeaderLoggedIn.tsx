import { Button } from "flowbite-react";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const HeaderLoggedIn = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex sticky top-0 h-14 bg-black_olive border-b py-4 px-4 justify-between text-snow z-10">
      <div
        className="hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <Undo2 size={25} />
      </div>
      <div className="flex justify-end gap-5 items-center">
        <Button
          data-testid="logout-button"
          onClick={handleLogout}
          className="poppins-semibold py-0"
          color={"primary"}
        >
          SIGN OUT
        </Button>
      </div>
    </div>
  );
};

export default HeaderLoggedIn;
