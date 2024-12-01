import { Checkbox, Group, Select, Stack } from "@mantine/core";
import { vectorData } from "../shared/constant";
import { useAtom } from "jotai";
import {
  airPressureContoursAtom,
  checkedGroupAtom,
  contourUrlsAtom,
} from "../atom/atom";

import { useEffect } from "react";
import { useFormatDateAndTime } from "../hooks/use-format-date-time";
import { useGenerateContourParam } from "../hooks/use-generate-contour-param";

export default function ContourLayers() {
  const [checkedContours, setCheckedContours] = useAtom(checkedGroupAtom);
  const [, setContourUrl] = useAtom(contourUrlsAtom);
  const [, setAirPressureContour] = useAtom(airPressureContoursAtom);

  const { formatDate, timeFormat } = useFormatDateAndTime();
  const contourParamArr = useGenerateContourParam({
    kpiArr: checkedContours,
    date: formatDate,
    time: timeFormat,
  });
  useEffect(() => {
    if (contourParamArr && contourParamArr.length) {
      const contourTileSource = contourParamArr.map((param) => {
        return `https://my-dev.map.ir/share/s/c/631/${param}/api/tile/layers/service@EPSG:3857@pbf/{z}/{y}/{x}.pbf`;
      });

      setContourUrl(contourTileSource);
    }
  }, [contourParamArr, setContourUrl]);
  return (
    <Stack dir="ltr">
      {vectorData.map((item, index) => {
        return (
          <Group key={index} justify="space-between">
            <Checkbox.Group
              value={checkedContours}
              onChange={setCheckedContours}
            >
              <Checkbox value={item.kpi} label={item.kpi} size="sm" />
              {/* {item.color.length !== 0 && (
                  <Indicator inline size={8} color={item.color} />
                )} */}
            </Checkbox.Group>

            <Select
              placeholder={item.airPressure[0]}
              data={item.airPressure}
              onChange={setAirPressureContour}
            />
          </Group>
        );
      })}
    </Stack>
  );
}
