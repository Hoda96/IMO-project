import { Checkbox, Group, Select, Stack } from "@mantine/core";
import { rasterMap } from "../shared/constant";

import { useAtom } from "jotai";
import {
  airPressureRastersAtom,
  rasterCheckedAtom,
  rasterUrlAtom,
} from "../atom/atom";

import { useEffect } from "react";
import { useFormatDateAndTime } from "../hooks/use-format-date-time";
import { useGenerateRasterParam } from "../hooks/use-generate-raster-param";

export default function RasterLayers() {
  const [checkedRaster, setCheckedRasters] = useAtom(rasterCheckedAtom);
  const [airPressureRaster, setAirPressureRaster] = useAtom(
    airPressureRastersAtom
  );
  const [, setUrl] = useAtom(rasterUrlAtom);

  const { formatDate, timeFormat } = useFormatDateAndTime();
  const rasterParam = useGenerateRasterParam({
    kpi: checkedRaster,
    date: formatDate,
    time: timeFormat,
  });

  useEffect(() => {
    const primaryUrl = `https://my-dev.map.ir/share/s/c/631/${rasterParam}__rgb/api/tile/layers/service@EPSG:3857@png/{z}/{y}/{x}-png`;
    const fallbackUrl = `https://my-dev.map.ir/share/s/c/631/${rasterParam}__data_band/api/tile/layers/service@EPSG:3857@png/{z}/{y}/{x}-png`;

    if (checkedRaster === "PM10") {
      setUrl(primaryUrl);
    } else {
      setUrl(fallbackUrl);
    }
  }, [rasterParam]);

  return (
    <Stack dir="ltr">
      {rasterMap.map((item, index) => {
        return (
          <Group key={index} justify="space-between" gap={"xs"}>
            <Checkbox
              label={item.kpi}
              size="sm"
              checked={checkedRaster.includes(item.kpi)}
              onChange={(e) => {
                const isChecked = e.currentTarget.checked;

                if (isChecked) {
                  setCheckedRasters(item.kpi);
                } else {
                  setCheckedRasters("");
                }
              }}
            />
            <Select
              placeholder={item.airPressure[0]}
              data={item.airPressure}
              onChange={setAirPressureRaster}
            />
          </Group>
        );
      })}
    </Stack>
  );
}
