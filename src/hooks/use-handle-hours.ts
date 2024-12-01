import { useAtom } from "jotai";
import { globalDateAtom, selectTimeValueAtom } from "../atom/atom";
import { hours } from "../shared/constant";

export const useHandleHours = () => {
  const [selectTimeValue, setSelectTimeValue] = useAtom(selectTimeValueAtom);
  const [, setDate] = useAtom(globalDateAtom);

  const modifyTime = (hoursToAdd: number) => {
    const currentIndex = hours.findIndex((time) => time === selectTimeValue);

    // const blocksToAdd = Math.floor(hoursToAdd / 3);
    let newIndex = currentIndex + hoursToAdd;
    newIndex = ((newIndex % hours.length) + hours.length) % hours.length;
    const newTimeValue = hours[newIndex];
    setSelectTimeValue(newTimeValue);

    if (newTimeValue === "00:00" && hoursToAdd > 0) {
      setDate((prevDate: string | number | Date) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    } else if (currentIndex === 0 && hoursToAdd < 0) {
      setDate((prevDate: string | number | Date) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    }
  };
  return modifyTime;
};
