import { Stack, TextInput, rem } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { Calendar, CalendarProvider } from "zaman";
import className from "./calender.module.css";

interface CalenderParams {
  date: Date;
  setDate: (date: Date) => void;
}
export default function CustomCalendar({ date, setDate }: CalenderParams) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("fa-IR"), []);

  const calendarContainerRef = useClickOutside(() => setShowCalendar(false));

  return (
    <CalendarProvider locale="fa" direction="rtl">
      <Stack pos={"relative"} ref={calendarContainerRef}>
        <TextInput
          style={{ width: rem(100) }}
          value={dateFormatter.format(date)}
          onClick={() => {
            setShowCalendar((s) => !s);
          }}
        ></TextInput>

        {showCalendar && (
          <Calendar
            onChange={(e) => {
              setShowCalendar(false);
              setDate(e.value);
            }}
            defaultValue={date}
            weekends={[6]}
            className={className["date-picker"]}
          />
        )}
      </Stack>
    </CalendarProvider>
  );
}
