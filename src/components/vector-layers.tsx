import { Checkbox, Group, Indicator, Select, Stack, rem } from "@mantine/core";
import { vectorData } from "../shared/constant";

export default function VectorLayers() {
  return (
    <Stack dir="ltr">
      {vectorData.map((item, index) => {
        return (
          <Group key={index} justify="space-between">
            <Group gap={'xs'}>
              <Checkbox label={item.kpi} size="sm" />
              {item.color.length !== 0 && (
                <Indicator inline size={8} color={item.color} />
              )}
            </Group>
            <Select
              placeholder={item.elevation[0]}
              data={item.elevation}
              
            />
          </Group>
        );
      })}
    </Stack>
  );
}
