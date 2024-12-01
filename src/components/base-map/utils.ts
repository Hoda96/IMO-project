import { urls } from "../../config/config";
import { StyleSpecification } from "maplibre-gl";
import { IMapStyle } from "../../shared/type";

export const generateMapStyle = ({
  type,
  source,
}: IMapStyle): string | StyleSpecification => {
  if (type === "vector") {
    return `${urls.Base}/vector/styles/main/${source}.json`;
  }
  return generateRasterMapStyle(source);
};

const getRasterTileUrlFromSource = (source: string) =>
  source === "mapir-raster"
    ? `${urls.Base}/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png`
    : source === "google-satellite"
    ? `${urls.GoogleProxy}/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
    : source === "google-satellite-label"
    ? `${urls.GoogleProxy}/vt/lyrs=y&hl=fa&x={x}&y={y}&z={z}`
    : source === "osm-raster"
    ? "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    : `${urls.Base}/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png`;

const generateRasterMapStyle = (source: string): StyleSpecification => {
  return {
    version: 8,
    sprite: `${urls.Base}/vector/styles/main/sprite`,
    glyphs: `${urls.Base}/vector/styles/main/glyphs/{fontstack}/{range}.pbf`,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [getRasterTileUrlFromSource(source)],
        tileSize: 256,
        attribution: "",
      },
    },
    layers: [
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };
};
export function convertToDms(lat: number | undefined, lng: number | undefined) {
  function toDms(value: number, direction: string) {
    const absValue = Math.abs(value);
    const degrees = Math.floor(absValue);
    const minutes = Math.floor((absValue - degrees) * 60);
    const seconds = Math.round((absValue - degrees - minutes / 60) * 3600);

    const directionStr =
      direction === "lat" ? (value < 0 ? "S" : "N") : value < 0 ? "W" : "E";
    return `${degrees}° ${minutes}' ${seconds}" ${directionStr}`;
  }

  const latDms = lat && toDms(lat, "lat");
  const lngDms = lng && toDms(lng, "lon");
  return {
    latDms,
    lngDms,
  };
}
