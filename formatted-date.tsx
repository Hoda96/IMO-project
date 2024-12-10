import { Group, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { globalDateAtom, selectTimeValueAtom } from "../atom/atom";
import { useAtom } from "jotai";

function FormattedDate() {
  const [date] = useAtom(globalDateAtom);
  const [selectTimeValue] = useAtom(selectTimeValueAtom);
  const [formattedDates, setFormattedDates] = useState("");

  const dateFormatter = useMemo(() => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    } as const;

    return new Intl.DateTimeFormat("fa-IR", options);
  }, []);

  useEffect(() => {
    const formattedDate = dateFormatter.format(date);
    setFormattedDates(formattedDate);
  }, [dateFormatter, date]);

  return (
    <Group gap={"xs"}>
      <Text c="dimmed">{formattedDates}</Text>
      <Text c="dimmed" mt={"1"}>
        -
      </Text>
      <Text c="dimmed"> {selectTimeValue}</Text>
    </Group>
  );
}
export default FormattedDate;
