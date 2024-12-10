import { Divider, Group, Stack, Text, rem } from "@mantine/core";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Popup,
  Source,
} from "react-map-gl/maplibre";

import { X_API_KEY } from "./config/config";

import { useAtom } from "jotai";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import {
  checkedGroupAtom,
  contourLayersColorAtom,
  contourUrlsAtom,
  kpiChartModalAtom,
  kpiPopupAtom,
  mapStyleAtom,
  maximizeAtom,
  mouseClickAtom,
  mouseMoveAtom,
  rasterCheckedAtom,
  rasterTileOpacityMapAtom,
  rasterUrlAtom,
} from "./atom/atom";
import { convertToDms, generateMapStyle } from "./components/base-map/utils";
import Navbar from "./components/navbar";

import Attribute from "./components/attribute";

import style from "../src/style/style.module.css";
import KpiChartModal from "./components/kpi-chart-modal";
import KpiPopup from "./components/kpi-popup";
import LayersAccordion from "./components/layers-accordion";
import { contourStyle } from "./shared/utils";

function App() {
  const [mapStyle] = useAtom(mapStyleAtom);

  const [checkedRasters] = useAtom(rasterCheckedAtom);
  const [checkedContours] = useAtom(checkedGroupAtom);
  const [rasterTileSource] = useAtom(rasterUrlAtom);
  const [contourTilesSource] = useAtom(contourUrlsAtom);
  const [contourLayersColor] = useAtom(contourLayersColorAtom);

  const [maximize] = useAtom(maximizeAtom);

  const [rasterTileOpacityMap] = useAtom(rasterTileOpacityMapAtom);

  const [firstContourId, setFirstContourId] = useState<string>();

  const [showPopup, setShowPopup] = useAtom(kpiPopupAtom);
  const [showKpiChartModal] = useAtom(kpiChartModalAtom);
  const [mouseClick, setMouseClick] = useAtom(mouseClickAtom);
  const [mouseMove, setMouseMove] = useAtom(mouseMoveAtom);
  const lat = mouseMove?.lngLat?.lat;
  const lng = mouseMove?.lngLat?.lng;
  const [popupCoordinates, setPopupCoordinates] = useState({ lat, lng });
  const popupLat = popupCoordinates.lat;
  const popupLng = popupCoordinates.lng;

  const showKpiPopup = showPopup && popupLat && popupLng;

  const { latDms, lngDms } = useMemo(() => {
    return convertToDms(lat, lng);
  }, [lat, lng]);

  const mapRef = useRef<MapRef>(null);

  const baseMapStyle = useMemo(() => {
    return generateMapStyle(mapStyle);
  }, [mapStyle]);

  useEffect(() => {
    if (mouseClick) {
      const lat = mouseClick.lngLat.lat;
      const lng = mouseClick.lngLat.lng;
      if (lat && lng) {
        setPopupCoordinates({ lat, lng });
        setShowPopup(true);
      }
    }
  }, [mouseClick, setShowPopup]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !map.isStyleLoaded()) return;

    const layers = map.getStyle().layers;

    const contourLayerss = layers.filter((l) =>
      l.id.startsWith("contour-layer-")
    );

    if (contourLayerss.length > 0) {
      const lastContourId = contourLayerss[0]?.id;

      setFirstContourId(lastContourId);
    }
  }, [mapRef, contourTilesSource]);

  return (
    <>
      <Stack w={"100%"} h={"100vh"}>
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 31.77,
            longitude: 54.82,
            zoom: 2,
          }}
          style={{ width: "100%", height: "100%", fontFamily: "IRANSansWebFa" }}
          mapStyle={baseMapStyle}
          transformRequest={(url) => ({
            url,
            headers: {
              "x-api-key": X_API_KEY,
            },
          })}
          onMouseMove={(e: SetStateAction<MapLayerMouseEvent | undefined>) =>
            setMouseMove(e)
          }
          onClick={(e: SetStateAction<MapLayerMouseEvent | undefined>) =>
            setMouseClick(e)
          }
        >
          <Navbar />
          {/* Layers */}
          <LayersAccordion />

          {checkedContours.length > 0 &&
            contourTilesSource.length &&
            contourTilesSource.map((contourTileSource, index) => {
              return (
                <Source
                  type="vector"
                  key={`contour-source-${index}`}
                  id={`contour-source-${index}`}
                  tiles={[contourTileSource]}
                >
                  <Layer {...contourStyle(index, contourLayersColor[index])} />
                </Source>
              );
            })}
          {checkedRasters && (
            <Source id="raster-source" type="raster" tiles={[rasterTileSource]}>
              <Layer
                id="raster-layer"
                type="raster"
                source="raster-source"
                beforeId={firstContourId}
                paint={{
                  "raster-opacity":
                    (rasterTileOpacityMap.get(rasterTileSource) ?? 100) / 100,
                }}
              />
            </Source>
          )}
          {mouseMove && (
            <Group className={style["lat-lng"]}>
              <Text size="12px" c="#FFFFFF">
                Lng: {lngDms}
              </Text>
              <Divider orientation="vertical" my={5} />
              <Text size="12px" c="#FFFFFF">
                Lat: {latDms}
              </Text>
            </Group>
          )}

          {showKpiPopup ? (
            <Popup
              latitude={popupLat}
              longitude={popupLng}
              maxWidth={rem(1000)}
              onClose={() => setShowPopup(false)}
              anchor="center"
            >
              <KpiPopup lat={popupLat} lng={popupLng} />
            </Popup>
          ) : null}

          {maximize && <Attribute />}
          {showKpiChartModal && <KpiChartModal />}
        </Map>
      </Stack>
    </>
  );
}

export default App;
