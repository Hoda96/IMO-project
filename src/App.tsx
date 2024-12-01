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
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  rasterUrlAtom,
} from "./atom/atom";
import { convertToDms, generateMapStyle } from "./components/base-map/utils";
import LayersAccordion from "./components/layers-accordion";
import Navbar from "./components/navbar";

import Attribute from "./components/attribute";

import style from "../src/style/style.module.css";
import KpiChartModal from "./components/kpi-chart-modal";
import KpiPopup from "./components/kpi-popup";
import { contourStyle } from "./shared/utils";

function App() {
  const [mapStyle] = useAtom(mapStyleAtom);
  const [checkedRasters] = useAtom(rasterCheckedAtom);
  const [checkedContours] = useAtom(checkedGroupAtom);
  const [rasterLayer] = useAtom(rasterUrlAtom);
  const [contourLayers] = useAtom(contourUrlsAtom);
  const [contourLayersColors] = useAtom(contourLayersColorAtom);
  const [maximize] = useAtom(maximizeAtom);
  const [mouseClick, setMouseClick] = useAtom(mouseClickAtom);
  const [showKpiPopup, setShowKpiPopup] = useAtom(kpiPopupAtom);
  const [showKpiChartModal] = useAtom(kpiChartModalAtom);

  const [mouseMove, setMouseMove] = useAtom(mouseMoveAtom);
  const lat = mouseMove?.lngLat?.lat;
  const lng = mouseMove?.lngLat?.lng;

  const { latDms, lngDms } = convertToDms(lat, lng);

  const [popupCoordinates, setPopupCoordinates] = useState({ lat, lng });
  const popupLat = popupCoordinates.lat;
  const popupLng = popupCoordinates.lng;

  const mapRef = useRef<MapRef>(null);

  const baseMapStyle = useMemo(() => {
    return generateMapStyle(mapStyle);
  }, [mapStyle]);

  const handleMouseMove = (
    e: SetStateAction<MapLayerMouseEvent | undefined>
  ) => {
    setMouseMove(e);
  };

  useEffect(() => {
    if (mouseClick) {
      const lat = mouseClick.lngLat.lat;
      const lng = mouseClick.lngLat.lng;
      if (lat && lng) {
        setPopupCoordinates({ lat, lng });
        setShowKpiPopup(true);
      }
    }
  }, [mouseClick]);

  const handleMouseClick = (
    e: SetStateAction<MapLayerMouseEvent | undefined>
  ) => {
    setMouseClick(e);
  };

  const [firstContourId, setFirstSymbolId] = useState<string>();

  const handleStyleLoad = useCallback(() => {
    let contourLayerss = [];
    let lastContourId: string | undefined;
    const map = mapRef.current?.getMap();
    if (map && map.isStyleLoaded()) {
      const layers = map.getStyle().layers;

      contourLayerss = layers.filter((l) => l.id.startsWith("contour-layers-"));

      if (contourLayerss.length > 0) {
        lastContourId = contourLayerss[contourLayerss.length - 1].id;
      }
      setFirstSymbolId(lastContourId);
    }
  }, [mapRef]);

  return (
    <>
      <Stack w={"100%"} h={"100vh"}>
        <Map
          ref={mapRef}
          onLoad={handleStyleLoad}
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
          onMouseMove={handleMouseMove}
          onClick={handleMouseClick}
        >
          <Navbar />
          {/* Layers */}
          <LayersAccordion />
          {/* LatLng */}
          {checkedContours.length > 0 &&
            contourLayers.length &&
            contourLayers.map((contourSource, index) => {
              return (
                <Source
                  type="vector"
                  key={`vector-source-${index}`}
                  id={`vector-source-${index}`}
                  tiles={[contourSource]}
                >
                  <Layer {...contourStyle(index, contourLayersColors[index])} />
                </Source>
              );
            })}
          {checkedRasters.length !== 0 && (
            <Source id="raster-source" type="raster" tiles={[rasterLayer]}>
              <Layer
                id="raster-layer"
                type="raster"
                source="raster-source"
                beforeId={firstContourId}
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

          {showKpiPopup && popupLat && popupLng ? (
            <Popup
              latitude={popupLat}
              longitude={popupLng}
              maxWidth={rem(1000)}
              onClose={() => setShowKpiPopup(false)}
              closeButton={false}
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
