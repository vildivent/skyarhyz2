import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import {
  AiFillStar,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineEdit,
  AiOutlineMenu,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";
import { BiFilterAlt } from "react-icons/bi";
import { BsListCheck, BsPeople, BsThreeDotsVertical } from "react-icons/bs";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
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
  info: { icon: <AiOutlineQuestionCircle /> },
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
export default function IconButton({
  btntype,
  className = "",
  title,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`p-2 text-2xl transition hover:text-primary disabled:text-smoke/20 ${className}`}
      title={title ?? buttonType[btntype].title}
      {...props}
    >
      {buttonType[btntype].icon}
    </button>
  );
}
