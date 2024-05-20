import { Undo2, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Button } from "flowbite-react";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex sticky top-0 h-14 bg-black_olive py-4 px-4 justify-between text-snow">
      <div
        className="hover:scale-110 hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <Undo2 size={25} />
      </div>
      <div className="flex justify-end gap-5 items-center">
        <Button
          onClick={handleLogout}
          className="bg-verdigris-500 poppins-semibold py-0"
        >
          SIGN OUT
        </Button>
        <Bell
          size={25}
          className="hover:scale-110 hover:cursor-pointer hover:animate-none"
        />
      </div>
    </div>
  );
};

export default Header;
