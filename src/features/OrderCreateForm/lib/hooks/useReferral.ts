import Cookies from "js-cookie";

export default function useReferral() {
  return Cookies.get("ref");
}
