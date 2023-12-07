import { FiPhone } from "react-icons/fi";
import IconWithTooltip from "~/components/IconWithTooltip";
import { formatPhoneNumber } from "~/shared/utils/phoneNumber";

type PhoneNumberBlockProps = {
  id: string;
  phoneNumber: string;
};
export default function PhoneNumberBlockAdmin({
  id,
  phoneNumber,
}: PhoneNumberBlockProps) {
  const size = 20;
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  return (
    <div className="flex items-center md:gap-2">
      <IconWithTooltip
        id={"admin-tel-" + id}
        icon={<FiPhone size={size} />}
        tooltip="Номер телефона"
      />
      <a className="ml-5 hover:text-primary" href={`tel:${phoneNumber}`}>
        {formattedPhoneNumber}
      </a>
    </div>
  );
}
