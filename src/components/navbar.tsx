import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Title,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { GrGrid } from "react-icons/gr";
import { LuMaximize, LuMinimize } from "react-icons/lu";
import { MdOutlineLinearScale } from "react-icons/md";
import CustomCalendar from "./calendar/calender";
import SelectTime from "./select-time";
import Logo from "../assets/icons/imo-logo.svg";

export default function Navbar() {
  let now = new Date();

  const [date, setDate] = useState(now);
  return (
    <Group
      px={16}
      bg={"#fff"}
      h={"52px"}
      style={{ position: "relative", top: "0" }}
      justify="space-between"
    >
      <Group gap={"xs"}>
        <Tooltip label="Cross Section">
          <ActionIcon>
            <MdOutlineLinearScale />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Grid">
          <ActionIcon>
            <GrGrid />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Minimize">
          <ActionIcon>
            <LuMinimize />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Maximize">
          <ActionIcon>
            <LuMaximize />
          </ActionIcon>
        </Tooltip>
        <Divider mx={"xs"} orientation="vertical" />
        <Button>+3h</Button>
        <Button>+24h</Button>
        <CustomCalendar date={date} setDate={setDate} />
        <SelectTime />
        <Button>-3h</Button>
        <Button>-24h</Button>
      </Group>
      <Group gap={"xs"}>
        <Title order={1} size={14} c={"#4C6EF5"}>
          سازمان هواشناسی
        </Title>
        <img src={Logo} alt="IMO-Logo" />
      </Group>
    </Group>
  );
}
