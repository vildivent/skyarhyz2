type Key = "userOrderCreate" | "adminOrderCreate";
type Message = Record<Key, string>;
const notificationMessages: Message = {
  userOrderCreate:
    "Ваша заявка принята. В ближайшее время она будет проверена и зарегистрирована администратором. Вся информация, касательно экскурсии будет приходить в уведомления на сайте. Чтобы их не пропустить, подключите уведомления в Telegram, если этого ещё не сделали. Для этого перейдите в свой профиль.",
  adminOrderCreate: "Была оставлена заявка.",
};
export default notificationMessages;
