import { atom } from "jotai";
import { hours } from "../shared/constant";
import { MapLayerMouseEvent } from "maplibre-gl";
import { KPIData } from "../shared/type";

const now = new Date();
const mapStyleAtom = atom({
  type: "vector",
  source: "mapir-xyz-style",
});

const mouseMoveAtom = atom<MapLayerMouseEvent>();
const mouseClickAtom = atom<MapLayerMouseEvent>();
const mapLabelIdsAtom = atom<string>("");
const selectTimeValueAtom = atom<string>(hours[3]);
const globalDateAtom = atom<Date>(now);
const formattedDateAtom = atom<string>("");
const globalTimeAtom = atom<string>("15:00");
const rasterCheckedAtom = atom<string>("");
const checkedGroupAtom = atom<string[]>([]);
const rasterUrlAtom = atom<string>("");
const contourUrlsAtom = atom<string[]>([]);
const maximizeAtom = atom<boolean>(true);
const kpiPopupAtom = atom<boolean>(false);
const kpiChartModalAtom = atom<boolean>(false);
// get kpi name
const getKpiAtom = atom<string | null>("");
//set kpi value on a specific lat,lng
const kpiAtom = atom<number | null>(null);
const chartDataAtom = atom<KPIData[]>([]);
const chipValueAtom = atom<string>("");
const airPressureContoursAtom = atom<string | null>("");
const airPressureRastersAtom = atom<string | null>("");
const contourLayersColorAtom = atom<string[]>([
  "#E51E2E",
  "#4C6EF5",
  "#333333",
  "#2E0767",
  "#EEEEEE",
  "#54ABC3",
  "#63AD42",
  "#CB7628",
]);
const displayChartAtom = atom(false);
export {
  mapStyleAtom,
  mouseClickAtom,
  mapLabelIdsAtom,
  selectTimeValueAtom,
  globalDateAtom,
  globalTimeAtom,
  rasterCheckedAtom,
  rasterUrlAtom,
  maximizeAtom,
  kpiPopupAtom,
  kpiChartModalAtom,
  getKpiAtom,
  kpiAtom,
  chipValueAtom,
  checkedGroupAtom,
  contourUrlsAtom,
  contourLayersColorAtom,
  mouseMoveAtom,
  airPressureContoursAtom,
  airPressureRastersAtom,
  displayChartAtom,
  formattedDateAtom,
  chartDataAtom,
};
