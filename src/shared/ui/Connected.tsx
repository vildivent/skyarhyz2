import { IoCheckmark } from "react-icons/io5";

export default function Connected() {
  return (
    <div className="flex items-center gap-2">
      Подключено
      <span className="text-green-600">
        <IoCheckmark />
      </span>
    </div>
  );
}
