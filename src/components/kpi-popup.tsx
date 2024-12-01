import { Stack, Group, Divider, Text, Button } from "@mantine/core";
import { rasterMap } from "../shared/constant";
import { useAtom } from "jotai";
import {
  displayChartAtom,
  getKpiAtom,
  kpiChartModalAtom,
  kpiPopupAtom,
} from "../atom/atom";

type PopupChartProps = {
  lat: number;
  lng: number;
};
export default function KpiPopup({ lat, lng }: PopupChartProps) {
  const [, setShowKpiChartModal] = useAtom(kpiChartModalAtom);
  const [, setShowKpiPopup] = useAtom(kpiPopupAtom);
  const [, setKpi] = useAtom(getKpiAtom);
  const [, setDisplayChart] = useAtom(displayChartAtom);
  return (
    <Stack p={"md"}>
      <Group>
        <Text size="sm"> {lat.toFixed(3)}</Text>
        <Text size="sm" c="dimmed">
          طول
        </Text>
        <Divider orientation="vertical" />
        <Text size="sm">{lng.toFixed(3)}</Text>
        <Text size="sm" c="dimmed">
          عرض
        </Text>
      </Group>
      {rasterMap.map((item, index) => {
        return (
          <Group justify="space-between" key={index}>
            <Button
              size="xs"
              variant="default"
              // styles={{
              //   root: {
              //     backgroundColor: "#F7F7F8",
              //     width: 53,
              //     height: 20,
              //   },
              //   label: {
              //     color: "#98A2B3",
              //   },
              // }}
              onClick={() => {
                setShowKpiPopup(false);
                setShowKpiChartModal(true);
                setDisplayChart(true);
                setKpi(item.kpi);
              }}
            >
              {item.kpi}
            </Button>
            <Text size="sm">34567</Text>
          </Group>
        );
      })}
    </Stack>
  );
}
