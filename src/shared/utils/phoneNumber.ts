export const formatPhoneNumber = (input: string) => {
  return `${input.charAt(0) + input.charAt(1)} (${
    input.charAt(2) + input.charAt(3) + input.charAt(4)
  }) ${input.charAt(5) + input.charAt(6) + input.charAt(7)} ${
    input.charAt(8) + input.charAt(9)
  }-${input.charAt(10) + input.charAt(11)}`;
};

export const parsePhoneNumber = (input: string) => {
  const parsed = input.match(/[0-9]/g)?.join("") ?? "";
  return `+${parsed}`;
};
