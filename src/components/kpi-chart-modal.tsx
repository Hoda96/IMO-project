import { AreaChart } from "@mantine/charts";
import {
  Chip,
  Divider,
  Group,
  Modal,
  Select,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useAtom } from "jotai";
import IconX from "../assets/icons/icon-x.svg";
import {
  chipValueAtom,
  displayChartAtom,
  getKpiAtom,
  kpiChartModalAtom,
  mouseClickAtom,
} from "../atom/atom";
import useKPIValue from "../hooks/use-kpi-value";
export default function KpiChartModal() {
  const [showKpiChartModal, setShowKpiChartModal] = useAtom(kpiChartModalAtom);
  const [kpi, setKpi] = useAtom(getKpiAtom);
  const [chipValue, setChipValue] = useAtom(chipValueAtom);
  const [displayChart] = useAtom(displayChartAtom);
  const [mouseClick] = useAtom(mouseClickAtom);

  const { chartData, isLoading } = useKPIValue();
  const lat = mouseClick?.lngLat.lat;
  const lng = mouseClick?.lngLat.lng;
  return (
    <Modal
      withCloseButton={false}
      opened={showKpiChartModal}
      onClose={() => setShowKpiChartModal(false)}
    >
      <Stack>
        <Group align="flex-start" justify="space-between">
          <UnstyledButton onClick={() => setShowKpiChartModal(false)}>
            <img src={IconX} />
          </UnstyledButton>
          <Stack>
            <Text ta={"right"} size="md">
              نمایش نمودار
            </Text>

            <Group>
              <Text size="sm"> {lat?.toFixed(3)}</Text>
              <Text size="sm" c="dimmed">
                طول
              </Text>
              <Divider orientation="vertical" />
              <Text size="sm">{lng?.toFixed(3)}</Text>
              <Text size="sm" c="dimmed">
                عرض
              </Text>
            </Group>
          </Stack>
        </Group>
        <Group justify="space-between">
          <Group>
            <Chip.Group
              multiple={false}
              value={chipValue}
              onChange={setChipValue}
            >
              <Chip size="sm" radius={"sm"} value="+1d">
                +1d
              </Chip>
              <Chip size="sm" radius={"sm"} value="+3d">
                +3d
              </Chip>
              <Chip size="sm" radius={"sm"} value="+5d" disabled>
                +5d
              </Chip>
              <Chip size="sm" radius={"sm"} value="+7d" disabled>
                +7d
              </Chip>
            </Chip.Group>
          </Group>
          <Group>
            <Select
              value={kpi}
              data={["PM10", "T2", "CLD", "SPD", "RH", "DIR"]}
              onChange={(value) => setKpi(value)}
            />
          </Group>
        </Group>
        <Group py={40}>
          {displayChart ? (
            <Skeleton visible={isLoading}>
              <AreaChart
                tooltipAnimationDuration={200}
                curveType="linear"
                h={300}
                data={chartData}
                dataKey={"date"}
                type="stacked"
                series={[{ name: "value", color: "indigo.6" }]}
                xAxisProps={{
                  angle: -45,
                  textAnchor: "end",
                  padding: { left: 15, right: 15 },
                }}
              />
            </Skeleton>
          ) : null}
        </Group>
      </Stack>
    </Modal>
  );
}
