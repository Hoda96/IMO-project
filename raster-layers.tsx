import {
  Checkbox,
  Group,
  Popover,
  Select,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { rasterMap } from "../shared/constant";

import { useAtom } from "jotai";
import {
  airPressureRastersAtom,
  rasterCheckedAtom,
  rasterTileOpacityMapAtom,
  rasterUrlAtom,
} from "../atom/atom";

import { useEffect, useState } from "react";
import { useFormatDateAndTime } from "../hooks/use-format-date-time";
import { useGenerateRasterParam } from "../hooks/use-generate-raster-param";
import VerticalMenuIcon from "../assets/icons/menu-vertical.svg";

function RasterLayers() {
  const [checkedRaster, setCheckedRasters] = useAtom(rasterCheckedAtom);
  const [, setAirPressureRaster] = useAtom(airPressureRastersAtom);
  const [rasterTileSource, setRasterTileSource] = useAtom(rasterUrlAtom);
  const [rasterTileOpacityMap, setRasterTileToOpacityMap] = useAtom(
    rasterTileOpacityMapAtom
  );
  const [selectedAirPressure, setSelectedAirPressure] = useState<{
    [key: string]: string | null;
  }>({});
  const { formatDate, timeFormat } = useFormatDateAndTime();
  const rasterParam = useGenerateRasterParam({
    kpi: checkedRaster,
    date: formatDate,
    time: timeFormat,
  });

  useEffect(() => {
    const primaryUrl = `https://my-dev.map.ir/share/s/c/631/${rasterParam}__rgb/api/tile/layers/service@EPSG:3857@png/{z}/{y}/{x}-png`;

    setRasterTileSource(primaryUrl);
  }, [rasterParam]);

  const handleCheckboxChange =
    (item: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      if (isChecked) {
        setCheckedRasters(item.kpi);
      } else {
        setCheckedRasters("");

        setSelectedAirPressure((prev) => ({
          ...prev,
          [item.kpi]: null,
        }));
        setAirPressureRaster(null);
      }
    };

  return (
    <Stack dir="ltr">
      {rasterMap.map((item, index) => {
        return (
          <Group key={index} justify="space-between" gap={"xs"}>
            <Group>
              <Popover width={256} position="bottom" withinPortal zIndex={1000}>
                <Popover.Target>
                  <img src={VerticalMenuIcon} style={{ cursor: "pointer" }} />
                </Popover.Target>

                <Popover.Dropdown>
                  <Stack>
                    <Text size="xs" ta={"right"}>
                      شفافیت
                    </Text>
                    <Slider
                      color="blue"
                      size="xs"
                      value={rasterTileOpacityMap.get(rasterTileSource) ?? 100}
                      onChange={(v) => {
                        setRasterTileToOpacityMap((prev) => {
                          const newMap = new Map(prev);
                          newMap.set(rasterTileSource, v);
                          return newMap;
                        });
                      }}
                    />
                  </Stack>
                </Popover.Dropdown>
              </Popover>
              <Checkbox
                label={item.kpi}
                size="sm"
                checked={checkedRaster.includes(item.kpi)}
                onChange={handleCheckboxChange(item)}
              />
            </Group>
            <Select
              placeholder={item.airPressure[0]}
              data={item.airPressure}
              value={selectedAirPressure[item.kpi] ?? null}
              onChange={(value) => {
                setAirPressureRaster(value);
                setSelectedAirPressure((prev) => ({
                  ...prev,
                  [item.kpi]: value,
                }));
              }}
            />
          </Group>
        );
      })}
    </Stack>
  );
}
export default RasterLayers;
