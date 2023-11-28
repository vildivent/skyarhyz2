import Button from "~/shared/ui/Button";
import Connected from "~/shared/ui/Connected";

import {
  NotificationsIcon,
  TelegramIcon,
  WhatsappIcon,
} from "~/shared/ui/icons";

type NotificationsStatusProps = {
  telegram?: boolean | null;
  whatsapp?: boolean | null;
};
export default function NotificationsStatus({
  telegram,
  whatsapp,
}: NotificationsStatusProps) {
  return (
    <div className="grid grid-rows-3 gap-2">
      <Row
        icon={<NotificationsIcon className="h-8 w-8" />}
        title="на сайте"
        status={<Connected />}
      />
      <Row
        icon={<TelegramIcon />}
        title="Телеграм"
        status={telegram ? <Connected /> : <Button>Подключить</Button>}
      />
      <Row
        icon={<WhatsappIcon />}
        title="WhatsApp"
        status={whatsapp ? <Connected /> : <Button>Подключить</Button>}
      />
    </div>
  );
}
type RowProps = {
  icon: React.ReactNode;
  title: string;
  status: React.ReactNode;
};
function Row({ icon, title, status }: RowProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5">
        <div className="h-8 w-8">{icon}</div>
        {title}
      </div>
      {status}
    </div>
  );
}
