/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Divide, MoreVertical, PanelLeftClose, PanelLeftOpen, UserRoundX } from "lucide-react";
import SideNavItem from "./SideNavItem";
import { BarChart3, LayoutDashboard, BookOpenText } from "lucide-react";
import { NavContext } from "../context/NavContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Dropdown } from "flowbite-react";

const SideNav = () => {
  let activeItemId: number = 0;
  const pageContext = useContext(NavContext);

  switch (pageContext) {
    case "dashboard": {
      activeItemId = 1;
      break;
    }
    case "courses": {
      activeItemId = 2;
      break;
    }
    case "grades": {
      activeItemId = 3;
      break;
    }
    default: {
      activeItemId = 1;
    }
  }

   // Retrieve the expanded state from local storage
   const [expanded, setExpanded] = useState<boolean>(() => {
    const savedExpanded = localStorage.getItem("sideNavExpanded");
    return savedExpanded ? JSON.parse(savedExpanded) : true;
  });

  const [activeListItem, setActiveListItem] = useState<number>(activeItemId);
  const { user } = useAuthContext();

  // Update local storage whenever the expanded state changes
  useEffect(() => {
    localStorage.setItem("sideNavExpanded", JSON.stringify(expanded));
  }, [expanded]);
  return (
    <nav
      className={`poppins-medium h-screen sticky top-0 flex-1 inline-flex flex-col bg-black_olive border-r shadow-sm transition-all ${
        expanded ? "lg:w-1/5" : "lg:w-18"
      }`}
    >
      <div className="p-4 pb-2 flex justify-between items-center text-left">
        <img
          src="/LMS-LOGO.png"
          className={`overflow-hidden transition-all h-full w-2/3 ${
            expanded ? "w-1/5" : "w-0 h-0 invisible"
          }`}
          alt="logo"
        />
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 rounded-lg bg-black_olive text-snow hover:scale-125"
        >
          {expanded ? (
            <PanelLeftClose size={27} />
          ) : (
            <PanelLeftOpen size={27} />
          )}
        </button>
      </div>
      <ul className="flex-1 px-3 py-5">
        <SideNavItem
          icon={<LayoutDashboard size={25} />}
          text="Dashboard"
          expanded={expanded}
          id={1}
          active={activeListItem === 1}
          setActiveListItem={setActiveListItem}
        />
        <SideNavItem
          icon={<BookOpenText size={25} />}
          text="Courses"
          expanded={expanded}
          id={2}
          active={activeListItem === 2}
          setActiveListItem={setActiveListItem}
        />
        <SideNavItem
          icon={<BarChart3 size={25} />}
          text="Grades"
          expanded={expanded}
          id={3}
          active={activeListItem === 3}
          setActiveListItem={setActiveListItem}
        />
      </ul>

      <div
        className={`
                  poppins-medium flex justify-between items-center
                  overflow-hidden transition-all border-t p-3 
              `}
      >
        <img
          src={`https://ui-avatars.com/api/?background=a1d6d9&color=000000&bold=true&name=${user.username}`}
          alt=""
          className="w-10 h-10 rounded-md"
        />
        <div
          className={`
                  flex justify-between items-center
                  overflow-hidden transition-all text-snow ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }
              `}
        >
          <div className="leading-4">
            <h4 className="font-semibold text-snow-600">{user.username}</h4>
            <span className="poppins-light-italic text-xs text-snow-600">
              {user.email}
            </span>
          </div>
          <Dropdown label="" placement="top" dismissOnClick={false} renderTrigger={() => <MoreVertical size={20} />}>
            <Dropdown.Item className="text-red-600 gap-2 items-center hover:bg-red-200"><UserRoundX />Delete Account</Dropdown.Item>
          </Dropdown>
          
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
