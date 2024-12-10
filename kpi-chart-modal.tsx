import {
  Modal,
  Stack,
  Text,
  Select,
  Group,
  Chip,
  Loader,
  UnstyledButton,
  Divider,
} from "@mantine/core";
import { useAtom } from "jotai";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import IconX from "../assets/icons/icon-x.svg";
import {
  chipValueAtom,
  displayChartAtom,
  getKpiAtom,
  kpiChartModalAtom,
  mouseClickAtom,
} from "../atom/atom";
import useKPIValue from "../hooks/use-kpi-value";

function KpiChartModal() {
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
            <img src={IconX} alt="Close" />
          </UnstyledButton>
          <Stack>
            <Text ta={"right"} size="md">
              نمایش نمودار
            </Text>
            <Group>
              <Text size="sm">{lat?.toFixed(3)}</Text>
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
              <Chip size="sm" radius={"sm"} value="+1d" disabled>
                +1d
              </Chip>
              <Chip size="sm" radius={"sm"} value="+3d" disabled>
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

        {isLoading ? (
          <Group w={"100%"} justify="center">
            <Loader color="blue" type="dots" />
          </Group>
        ) : displayChart ? (
          <ResponsiveContainer
            width="100%"
            height={400}
            style={{ fontSize: 14 }}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1453ff" stopOpacity={0.8} />
                  <stop offset="75%" stopColor="#1453ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dateAndTime"
                angle={-18}
                textAnchor="end"
                tick={{
                  fontSize: 10,
                  dy: 0,
                }}
                interval={0}
                scale="band"
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke={"#1453ff"}
                fillOpacity={1}
                fill="url(#colorUv)"
                animationDuration={5000}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </Stack>
    </Modal>
  );
}

export default KpiChartModal;
