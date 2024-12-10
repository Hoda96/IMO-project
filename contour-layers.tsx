import { Checkbox, Group, Indicator, Select, Stack } from "@mantine/core";
import { vectorData } from "../shared/constant";
import { useAtom } from "jotai";
import {
  airPressureContoursAtom,
  checkedGroupAtom,
  contourUrlsAtom,
} from "../atom/atom";

import { useEffect, useState } from "react";
import { useFormatDateAndTime } from "../hooks/use-format-date-time";
import { useGenerateContourParam } from "../hooks/use-generate-contour-param";

function ContourLayers() {
  const [checkedContours, setCheckedContours] = useAtom(checkedGroupAtom);
  const [, setContourTilesSource] = useAtom(contourUrlsAtom);
  const [, setAirPressureContour] = useAtom(airPressureContoursAtom);
  const [selectedAirPressures, setSelectedAirPressures] = useState<{
    [key: string]: string | null;
  }>({});
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
      setContourTilesSource(contourTileSource);
    }
  }, [contourParamArr, setContourTilesSource]);

  const handleCheckboxChange =
    (item: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;

      if (isChecked) {
        setCheckedContours((prev) => [...prev, item.kpi]);

        setAirPressureContour(item.airPressure[0]);
      } else {
        setCheckedContours((prev) => prev.filter((kpi) => kpi !== item.kpi));

        setSelectedAirPressures((prev) => ({
          ...prev,
          [item.kpi]: null,
        }));
        setAirPressureContour(null);
      }
    };

  return (
    <Stack dir="ltr">
      {vectorData.map((item, index) => {
        return (
          <Group key={index} justify="space-between">
            <Checkbox.Group value={checkedContours}>
              <Checkbox
                value={item.kpi}
                label={item.kpi}
                size="sm"
                onChange={handleCheckboxChange(item)}
              />
              {/* {item.color.length !== 0 && (
                <Indicator inline size={8} color={item.color} />
              )} */}
            </Checkbox.Group>
            <Select
              placeholder={item.airPressure[0]}
              data={item.airPressure}
              value={selectedAirPressures[item.kpi] ?? null}
              onChange={(value) => {
                setSelectedAirPressures((prev) => ({
                  ...prev,
                  [item.kpi]: value,
                }));
                setAirPressureContour(value);
              }}
              onClear={() => {
                setSelectedAirPressures((prev) => ({
                  ...prev,
                  [item.kpi]: null,
                }));
                setAirPressureContour(null);
              }}
            />
          </Group>
        );
      })}
    </Stack>
  );
}
export default ContourLayers;
