import axios, { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { chartDataAtom, getKpiAtom, mouseClickAtom } from "../atom/atom";
import { useEffect, useState } from "react";
import { useFormatDateAndTime } from "./use-format-date-time";
import { KPIData } from "../shared/type";
import { DateFormatter, replaceEnglishNumbers } from "../shared/utils";

function useKPIValue() {
  const [mouseClick] = useAtom(mouseClickAtom);
  const [kpi] = useAtom(getKpiAtom);
  const { formatDate } = useFormatDateAndTime();
  const [chartData, setChartData] = useAtom(chartDataAtom);
  const [isLoading, setIsLoading] = useState(false);
  const lat = mouseClick?.lngLat?.lat;
  const lng = mouseClick?.lngLat?.lng;

  useEffect(() => {
    const fetchKPIValues = async () => {
      if (!kpi || !lat || !lng) return;

      const kpiDataArray: KPIData[] = [];
      const startDate = new Date(formatDate);

      // Calculate the next three days
      for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + dayOffset);

        // Loop through each 3-hour interval
        for (let hourOffset = 0; hourOffset < 24; hourOffset += 3) {
          const formattedDateStr = newDate.toISOString().split("T")[0];

          const formattedTimeStr = `${String(hourOffset).padStart(2, "0")}`;

          const KPIParam = `${kpi}__${formattedDateStr}__${String(
            hourOffset
          ).padStart(2, "0")}`;

          try {
            // Fetch the KPI value from the API
            const response: AxiosResponse<{
              data: { value: string };
            }> = await axios.get(
              `https://my-dev.map.ir/share/s/c/631/${KPIParam}__data_band/api/tile/layers/service/identify`,
              {
                params: {
                  lat: lat,
                  lon: lng,
                },
              }
            );

            // Push the result into the kpiDataArray
            kpiDataArray.push({
              date:
                DateFormatter(newDate) +
                "-" +
                replaceEnglishNumbers(formattedTimeStr.padEnd(5, ":00")),
              time: formattedTimeStr,
              value:
                response.data.data.value !== undefined
                  ? parseFloat(response.data.data.value)
                  : null,
            });
            setIsLoading(true);
          } catch (error) {
            console.error(
              `Error fetching KPI for ${formattedDateStr} ${formattedTimeStr}:`,
              (error as Error).message
            );
            // Push a result with null for value if there is an error
            kpiDataArray.push({
              date:
                DateFormatter(newDate) +
                "-" +
                replaceEnglishNumbers(formattedTimeStr.padEnd(5, ":00")),
              time: formattedTimeStr,
              value: null,
            });
          }
        }
      }
      // Update the state with the array of KPI data
      setChartData(kpiDataArray);
      setIsLoading(false);
    };

    fetchKPIValues();
  }, [formatDate, kpi, mouseClick, lat, lng, setChartData]);

  return { chartData, isLoading };
}

export default useKPIValue;
