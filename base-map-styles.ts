
import { mapStylesSourcesType } from "../../shared/type";

export const mapStylesSources: mapStylesSourcesType[] = [
  {
    source: "mapir-xyz-style",
    type: "vector",
    labelID: "Few Details",
  },
  {
    source: "mapir-style-dark",
    type: "vector",
    labelID: "Dark",
  },
  {
    source: "mapir-xyz-light-style",
    type: "vector",
    labelID: "Light",
  },
  {
    source: "google-satellite",
    type: "raster",
    labelID: "Google Satellite",
  },
  {
    source: "google-satellite-label",
    type: "raster",
    labelID: "Google Satellite With Label",
  },
  {
    source: "osm-raster",
    type: "raster",
    labelID: "OSM",
  },
];
