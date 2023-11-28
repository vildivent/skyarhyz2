import { phoneNumberMask } from "./inputMasks";

export const formatPhoneNumber = (input: string) => {
  return phoneNumberMask(input);
};

export const parsePhoneNumber = (input: string) => {
  const parsed = input.match(/[0-9]/g)?.join("") ?? "";
  return `+${parsed}`;
};
