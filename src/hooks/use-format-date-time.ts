import { useAtom } from "jotai";
import { globalDateAtom, selectTimeValueAtom } from "../atom/atom";

export const useFormatDateAndTime = () => {
  const [date] = useAtom(globalDateAtom);
  const [currentTime] = useAtom(selectTimeValueAtom);
  // format date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString();

  const padMonth = month.length === 1 ? month.padStart(2, "0") : month;

  const day = date.getDate();
  const formatDate = year + "-" + padMonth + "-" + day;
  //   format time
  const timeFormat = currentTime;

  return { formatDate, timeFormat };
};
