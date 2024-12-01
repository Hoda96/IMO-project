import { LineLayer } from "react-map-gl/dist/esm/exports-maplibre";
import { englishNumber, persianNumber } from "./constant";

export const contourStyle = (id: string | number, color: string): LineLayer => {
  return {
    id: `contour-layers-${id}`,
    type: "line",
    source: "contour",
    "source-layer": "default",
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-width": [
        "interpolate",
        ["exponential", 1.5],
        ["zoom"],
        1,
        2,
        18,
        44,
      ],
      "line-color": `${color}`,
      "line-translate": [0, 0],
    },
  };
};

export function replaceEnglishNumbers(inputString: string) {
  for (let i = 0; i < englishNumber.length; i++) {
    inputString = inputString.replace(
      new RegExp(englishNumber[i], "g"),
      persianNumber[i]
    );
  }
  return inputString;
}

export function replacePersianNumbers(inputString: any) {
  for (let i = 0; i < persianNumber.length; i++) {
    inputString = inputString.replace(
      new RegExp(persianNumber[i], "g"),
      englishNumber[i]
    );
  }
  return inputString;
}

export function DateFormatter(date: Date) {
  let convertedDate = date.toLocaleDateString("fa-IR").split("/").join("-");

  let parts = convertedDate.split("-");

  if (parts[1].length === 1) {
    parts[1] = "0" + parts[1];
  }
  if (parts[2].length === 1) {
    parts[2] = "0" + parts[2];
  }
  convertedDate = parts.join("/");

  return replaceEnglishNumbers(convertedDate);
}
