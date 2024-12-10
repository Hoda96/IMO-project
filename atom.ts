import { atom } from "jotai";
import { MapLayerMouseEvent } from "maplibre-gl";
import { hours } from "../shared/constant";
import { KPI, KPIData } from "../shared/type";

export const now = new Date();
export const mapStyleAtom = atom({
  type: "vector",
  source: "mapir-xyz-style",
});

export const mouseMoveAtom = atom<MapLayerMouseEvent>();
export const mouseClickAtom = atom<MapLayerMouseEvent>();
export const mapLabelIdsAtom = atom<string>("");
export const selectTimeValueAtom = atom<string>(hours[3]);
export const globalDateAtom = atom<Date>(now);
export const formattedDateAtom = atom<string>("");
export const globalTimeAtom = atom<string>("15:00");
export const rasterCheckedAtom = atom<string>("");
export const checkedGroupAtom = atom<string[]>([]);
export const rasterUrlAtom = atom<string>("");
export const contourUrlsAtom = atom<string[]>([]);
export const maximizeAtom = atom<boolean>(true);
export const kpiPopupAtom = atom<boolean>(false);
export const kpiChartModalAtom = atom<boolean>(false);
// get kpi name
export const getKpiAtom = atom<string | null>("");
//set kpi value on a specific lat,lng
export const kpiAtom = atom<number | null>(null);
export const chartDataAtom = atom<KPIData[]>([]);
export const identifyValueAtom = atom<KPI[]>([]);
export const chipValueAtom = atom<string>("");
export const airPressureContoursAtom = atom<string | null>("");
export const airPressureRastersAtom = atom<string | null>("");
export const contourLayersColorAtom = atom<string[]>([
  "#DE0D48",
  "#4C6EF5",
  "#3E4663",
  "#07F246",
  "#E51E2E",
  "#333333",
  "#2E0767",
  "#198CA8",
]);
export const rasterTileOpacityMapAtom = atom<Map<string, number>>(new Map());
export const rasterKpiLabelAtom = atom<string>("");

export const displayChartAtom = atom(false);
