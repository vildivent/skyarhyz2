export const phoneNumberMask = (input: string) => {
  let str: string;
  str = input.match(/[+0-9]/g)?.join("") ?? "";

  if (str.startsWith("+7")) {
    str = str.match(/[0-9]/g)?.join("").substring(1, 11) ?? "";
  } else {
    str = str.match(/[0-9]/g)?.join("").substring(0, 11) ?? "";
    if (str.length >= 11 && str.startsWith("8")) str = str.substring(1);
    str = str.substring(0, 10);
  }

  const code = str.substring(0, 3);
  const firstGroup = str.substring(3, 6);
  const secondGroup = str.substring(6, 8);
  const thirdGroup = str.substring(8, 10);

  if (!code) return ``;
  if (!firstGroup) return `+7 (${code}`;
  if (!secondGroup) return `+7 (${code}) ${firstGroup}`;
  if (!thirdGroup) return `+7 (${code}) ${firstGroup} ${secondGroup}`;

  return `+7 (${code}) ${firstGroup} ${secondGroup}-${thirdGroup}`;
};

export const groupMask = (input: string) => {
  let str = input.match(/[0-9]/g)?.join("") ?? "";
  str = `${+str}`;

  if (str === "0") return "";

  return str.substring(0, 2);
};

export const groupNumberMask = (input: string) => {
  return input.match(/[0-9]/g)?.join("").substring(0, 1) ?? "";
};

export const hourMask = (input: string) => {
  const hour = input.match(/[0-9]/g)?.join("").substring(0, 2);
  if (!hour) return "00";
  if (+hour > 23) return "23";
  return hour;
};

export const minuteMask = (input: string) => {
  const minute = input.match(/[0-9]/g)?.join("").substring(0, 2);
  if (!minute) return "00";
  if (+minute > 59) return "59";
  return minute;
};

export const limitMask = (input: string, limit: number) => {
  return input.substring(0, limit);
};
