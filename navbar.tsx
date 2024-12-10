import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Title,
  Tooltip,
} from "@mantine/core";

import { useAtom } from "jotai";
import { GrGrid } from "react-icons/gr";
import { LuMaximize, LuMinimize } from "react-icons/lu";
import { MdOutlineLinearScale } from "react-icons/md";
import Logo from "../assets/icons/imo-logo.svg";
import { globalDateAtom, maximizeAtom } from "../atom/atom";
import CustomCalendar from "./calendar/calender";
import FormattedDate from "./formatted-date";
import SelectTime from "./select-time";
import { useHandleHours } from "../hooks/use-handle-hours";
import { useCallback } from "react";

function Navbar() {
  const [date, setDate] = useAtom(globalDateAtom);
  const [maximize, setMaximize] = useAtom(maximizeAtom);

  const modifyTime = useHandleHours();

  const incrementDay = useCallback(() => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() + 1);
      return date;
    });
  }, [setDate]);

  const decrementDay = useCallback(() => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() - 1);
      return date;
    });
  }, [setDate]);

  const incrementHour = useCallback(() => {
    modifyTime(1);
  }, [modifyTime]);

  const decrementHour = useCallback(() => {
    modifyTime(-1);
  }, [modifyTime]);

  return (
    <>
      {maximize ? (
        <Group
          px={16}
          bg={"#fff"}
          h={"70px"}
          style={{ position: "relative", top: "0" }}
          justify="space-between"
        >
          <Group gap={"xs"}>
            <Tooltip label="Cross Section">
              <ActionIcon disabled>
                <MdOutlineLinearScale color="#667085" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Grid">
              <ActionIcon disabled>
                <GrGrid color="#667085" />
              </ActionIcon>
            </Tooltip>
            {maximize && (
              <Tooltip label="Maximize">
                <ActionIcon onClick={() => setMaximize(false)}>
                  <LuMaximize />
                </ActionIcon>
              </Tooltip>
            )}

            <Divider mx={"xs"} orientation="vertical" />
            <Button onClick={decrementDay}>-24h</Button>
            <Button onClick={decrementHour}>-1h</Button>
            <CustomCalendar date={date} setDate={setDate} />
            <SelectTime />
            <Button onClick={incrementHour}>+1h</Button>
            <Button onClick={incrementDay}>+24h</Button>
            <FormattedDate />
          </Group>
          <Group gap={"xs"}>
            <Title order={1} size={14} c={"#101828"}>
              سازمان هواشناسی کشور
            </Title>
            <img src={Logo} alt="IMO-Logo" width={70} height={70} />
          </Group>
        </Group>
      ) : (
        <Group px={16} h={"70px"} style={{ position: "relative", top: "0" }}>
          <Tooltip label="Minimize">
            <ActionIcon
              variant="default"
              radius={"md"}
              onClick={() => {
                setMaximize(true);
              }}
            >
              <LuMinimize />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </>
  );
}
export default Navbar;