import { Select } from "@mantine/core";
import { hours } from "../shared/constant";
import { useAtom } from "jotai";
import { selectTimeValueAtom } from "../atom/atom";

const TimeSelector = () => {
  const [selectTimeValue, setSelectTimeValue] = useAtom(selectTimeValueAtom);
  const handleChange = (value: string | null) => {
    if (value) {
      setSelectTimeValue(value);
    }
  };
  return (
    <Select
      data={hours}
      style={{ width: "100px" }}
      value={selectTimeValue}
      onChange={handleChange}
    />
  );
};

export default TimeSelector;
