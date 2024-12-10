export type VectorSourceIDs =
  | "mapir-xyz-style"
  | "mapir-style-dark"
  | "mapir-xyz-light-style"
  | "mapir-Dove-style"
  | "mapir-frank-style";

export type RasterSourceIDs =
  | "mapir-raster"
  | "google-satellite"
  | "google-satellite-label"
  | "google-terrain-label"
  | "google-terrain-traffic-label"
  | "osm-raster";

export type MapStyleTypes = "vector" | "raster";

export type SourceIDs = VectorSourceIDs | RasterSourceIDs;

export type mapStylesSourcesType = {
  source: SourceIDs;
  type: MapStyleTypes;
  labelID: string;
};

export type IMapStyle = { type?: string; source: string };

export type rasterLayerParamsProps = {
  kpi: string;
  date: string;
  time: string;
};
export type contourLayerParamsProps = {
  kpiArr: string[];
  date: string;
  time: string;
};

export type KPIData = {
  date: string;
  time: string;
  dateAndTime: string;
  value: number | null;
  name: string;
};
export type KPI = {
  value: number | null;
  name: string;
};
