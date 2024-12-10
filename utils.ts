import { LineLayer } from "react-map-gl/dist/esm/exports-maplibre";
import { englishNumber, persianNumber } from "./constant";
import { X_API_KEY } from "../config/config";

export const contourStyle = (id: string | number, color: string): LineLayer => {
  return {
    id: `contour-layer-${id}`,
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

type Options =
  | { sendToken: false; token?: null }
  | { sendToken?: true; token: string };

export const getCommonHeaders = ({
  sendToken = false,
  token = null,
}: Options): Record<string, string> => {
  const headers: Record<string, string> = {
    "x-api-key": X_API_KEY,
  };

  if (sendToken && token) {
    headers.token = token;
  }

  return headers;
};
