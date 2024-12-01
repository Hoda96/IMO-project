import { useAtom } from "jotai";
import { airPressureRastersAtom } from "../atom/atom";
import { rasterLayerParamsProps } from "../shared/type";

export function useGenerateRasterParam({
  kpi,
  date,
  time,
}: rasterLayerParamsProps) {
  const [airPressureRaster] = useAtom(airPressureRastersAtom);

  if (kpi) {
    const rasterParam =
      kpi === "Pressure" || kpi === "Temperature"
        ? kpi.toLowerCase().concat("_") +
          airPressureRaster?.toString().concat("__") +
          date?.concat("__") +
          time?.slice(0, 2)
        : kpi?.concat("__") + date?.concat("__") + time?.slice(0, 2);

    return rasterParam;
  }
}
