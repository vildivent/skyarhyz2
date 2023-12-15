import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import {
  AiFillStar,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineEdit,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { BsListCheck, BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { NotificationsIcon, ResetFilterIcon } from "./icons";

type Key =
  | "close"
  | "search"
  | "menu"
  | "dots"
  | "checkAll"
  | "delete"
  | "edit"
  | "star"
  | "starFill"
  | "info"
  | "check"
  | "filter"
  | "filterReset"
  | "sortDown"
  | "sortUp"
  | "settings"
  | "excursionMode"
  | "arrowDown"
  | "notifications";
type ButtonType = Record<Key, { title?: string; icon: React.ReactNode }>;
const buttonType: ButtonType = {
  close: { title: "Закрыть", icon: <AiOutlineClose /> },
  search: { title: "Поиск", icon: <AiOutlineSearch /> },
  menu: { title: "Меню", icon: <AiOutlineMenu /> },
  dots: { icon: <BsThreeDotsVertical /> },
  checkAll: { title: "Отметить всё как прочитанное", icon: <BsListCheck /> },
  delete: { title: "Удалить", icon: <AiOutlineDelete /> },
  edit: { title: "Редактировать", icon: <AiOutlineEdit /> },
  star: { icon: <AiOutlineStar /> },
  starFill: { icon: <AiFillStar /> },
  info: { icon: <MdOutlineQuestionMark /> },
  check: { title: "Подтвердить", icon: <AiOutlineCheck /> },
  filter: { title: "Фильтры", icon: <BiFilterAlt /> },
  filterReset: { title: "Сбросить Фильтры", icon: <ResetFilterIcon /> },
  sortDown: { title: "Сортировка", icon: <FaSortDown /> },
  sortUp: { title: "Сортировка", icon: <FaSortUp /> },
  settings: { title: "Настройки", icon: <FiSettings /> },
  excursionMode: { title: "Режим подбора групп", icon: <BsPeople /> },
  arrowDown: { title: "Подробнее", icon: <AiOutlineDown /> },
  notifications: {
    title: "Уведомления",
    icon: <NotificationsIcon width={24} height={24} />,
  },
};
type IconButtonProps = {
  btntype: Key;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function iconButton({ btntype, title, className = "", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={`p-2 text-2xl transition hover:text-primary disabled:text-smoke/20 ${className}`}
        title={title ?? buttonType[btntype].title}
        type="button"
        {...props}
      >
        {buttonType[btntype].icon}
      </button>
    );
  },
);
export default IconButton;
