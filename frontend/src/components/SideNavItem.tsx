import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: ReactNode;
  text: string;
  active?: boolean;
  setActiveListItem: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  alert?: ReactNode;
  expanded?: boolean;
}

const SideNavItem: React.FC<Props> = ({
  icon,
  text,
  active,
  setActiveListItem,
  id,
  alert,
  expanded,
}) => {
  return (
    <>
      <Link to={`/${text.replace(" ", "")}`}>
        <li
          onClick={() => setActiveListItem(id)}
          className={`
          relative flex items-center py-3 px-3 my-3 lg:max-h-12
          font-medium rounded-md cursor-pointer
           group
          ${
            active
              ? "bg-snow text-black_olive transition-all"
              : "hover:bg-verdigris hover:text-black_olive-500 text-snow-500 transition-colors"
          }
      `}
        >
          {icon}
          <span
            className={`flex overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-verdigris ${
                expanded ? "" : "top-2"
              }`}
            />
          )}

          {!expanded && (
            <div
              className={`
            absolute left-full rounded-md px-2 py-1 ml-2 text-nowrap
            bg-snow text-black_olive text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-90 group-hover:translate-x-0
        `}
            >
              {text}
            </div>
          )}
        </li>
      </Link>
    </>
  );
};

export default SideNavItem;
