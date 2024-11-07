import { Checkbox, Group, Stack } from "@mantine/core";
import { rasterMap } from "../shared/constant";



export default function RasterMaps() {
  return (
    <Stack dir="ltr">
      {rasterMap.map((item, index) => {
        return (
          <Group key={index} justify="space-between">
            <Group gap={"xs"}>
              <Checkbox label={item.kpi} size="sm" />
            </Group>
          </Group>
        );
      })}
    </Stack>
  );
}
