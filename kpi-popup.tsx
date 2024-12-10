import { Stack, Group, Divider, Text, Button, Loader } from "@mantine/core";
import { useAtom } from "jotai";
import {
  displayChartAtom,
  getKpiAtom,
  kpiChartModalAtom,
  kpiPopupAtom,
} from "../atom/atom";
import useIdentify from "../hooks/use-identify";

type PopupChartProps = {
  lat: number;
  lng: number;
};

function KpiPopup({ lat, lng }: PopupChartProps) {
  const [, setShowKpiChartModal] = useAtom(kpiChartModalAtom);
  const [, setShowKpiPopup] = useAtom(kpiPopupAtom);
  const [, setKpi] = useAtom(getKpiAtom);
  const [, setDisplayChart] = useAtom(displayChartAtom);

  const { identifyValues, loading } = useIdentify();

  return (
    <Stack p={"md"}>
      <Group>
        <Text size="sm">{lat.toFixed(3)}</Text>
        <Text size="sm" c="dimmed">
          طول
        </Text>
        <Divider orientation="vertical" />
        <Text size="sm">{lng.toFixed(3)}</Text>
        <Text size="sm" c="dimmed">
          عرض
        </Text>
      </Group>
      {loading ? (
        <Group w={"100%"} justify="center">
          <Loader color="blue" type="dots" />
        </Group>
      ) : (
        <Stack>
          {identifyValues.map((item, index) =>
            item.value ? (
              <Group justify="space-between" key={index}>
                <>
                  <Button
                    size="xs"
                    variant="default"
                    onClick={() => {
                      setShowKpiPopup(false);
                      setShowKpiChartModal(true);
                      setDisplayChart(true);
                      setKpi(item.name);
                    }}
                  >
                    {item.name}
                  </Button>

                  <Text ta={"right"} size="sm">{`${item.value?.toFixed(
                    3
                  )}`}</Text>
                </>
              </Group>
            ) : null
          )}
        </Stack>
      )}
    </Stack>
  );
}
export default KpiPopup;
