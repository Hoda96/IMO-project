import { useCallback } from "react";
import { useAtom } from "jotai";

import { globalDateAtom, selectTimeValueAtom } from "../atom/atom";
export default function useModifyTime() {
  const [selectTimeValue] = useAtom(selectTimeValueAtom);
  const [date, setDate] = useAtom(globalDateAtom);

  const hourIncrement = useCallback(
    (value: number) => {
      const previousDate = new Date(date);

      previousDate.setHours(previousDate.getHours() - 3);

      setDate(previousDate);

      const [hour, minute] = selectTimeValue.split(":").map(Number);

      const newHour = (hour + value) % 24;

      return `${newHour.toString().padStart(2, "0")}:${minute

        .toString()

        .padStart(2, "0")}`;
    },
    [date, selectTimeValue, setDate]
  );

  return {
    hourIncrement,
  };
}
