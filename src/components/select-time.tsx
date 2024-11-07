import { Select, rem } from "@mantine/core";
import { hours } from "../shared/constant";
export default function SelectTime() {
  return (
    <Select placeholder={hours[0]} data={hours} style={{ width: rem(100) }} />
  );
}
