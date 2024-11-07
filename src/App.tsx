import { Stack } from "@mantine/core";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";

import { X_API_KEY } from "./config/config";

import Navbar from "./components/navbar";
import LayersAccordion from "./components/layers-accordion";
import { useAtom } from "jotai";
import { mapStyleAtom } from "./atom/atom";

function App() {
  const [mapStyle] = useAtom(mapStyleAtom);

  return (
    <Stack w={"100%"} h={"100vh"}>
      <Map
        initialViewState={{
          latitude: 31.77,
          longitude: 54.82,
          zoom: 2,
        }}
        style={{ width: "100%", height: "100%", fontFamily: "IRANSansWebFa" }}
        mapStyle={mapStyle}
        transformRequest={(url) => ({
          url,
          headers: {
            "x-api-key": X_API_KEY,
          },
        })}
      >
        {/* Navbar */}
        <Navbar />
        {/* Layers */}
        <LayersAccordion />
      </Map>
    </Stack>
  );
}

export default App;
