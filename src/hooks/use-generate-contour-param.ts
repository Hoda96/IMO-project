import { useAtom } from "jotai";
import { airPressureContoursAtom } from "../atom/atom";
import { contourLayerParamsProps } from "../shared/type";

export function useGenerateContourParam({
  kpiArr,
  date,
  time,
}: contourLayerParamsProps) {
  const [airPressureContour] = useAtom(airPressureContoursAtom);

  if (kpiArr && kpiArr.length) {
    const contoursArr = [];
    for (const kpi of kpiArr) {
      const contourParam =
        kpi === "Pressure" || kpi === "Temperature"
          ? kpi.toLowerCase().concat("_") +
            airPressureContour?.toString().concat("__") +
            date.concat("__") +
            time.slice(0, 2) +
            "__contour"
          : kpi.toString().concat("__") +
            date.concat("__") +
            time.slice(0, 2) +
            "__contour";
      contoursArr.push(contourParam);
    }
    return contoursArr;
  }
}
