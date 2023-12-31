const ru: Locale = {
  name: "gregorian_ru",
  months: [
    ["Январь", "Янв"],
    ["Февраль", "Фев"],
    ["Март", "Мар"],
    ["Апрель", "Апр"],
    ["Май", "Май"],
    ["Июнь", "Июн"],
    ["Июль", "Июл"],
    ["Август", "Авг"],
    ["Сентябрь", "Сен"],
    ["Окрябрь", "Окт"],
    ["Ноябрь", "Ноя"],
    ["Декабрь", "Дек"],
  ],
  weekDays: [
    ["Суббота", "Сб"],
    ["Воскресенье", "Вс"],
    ["Понедельник", "Пн"],
    ["Вторник", "Вт"],
    ["Среда", "Ср"],
    ["Четверг", "Чт"],
    ["Пятница", "Пт"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};

export default ru;

type Locale = {
  name: string;
  months: Array<string[]>;
  weekDays: Array<string[]>;
  digits: string[];
  meridiems: Array<string[]>;
};
