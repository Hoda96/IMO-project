import { Accordion, Stack, Text, Badge, Group } from "@mantine/core";
import ContourLayers from "./contour-layers";
import RasterLayers from "./raster-layers";
import BaseMaps from "./base-map/base-maps";
import { useAtom } from "jotai";
import {
  checkedGroupAtom,
  mapLabelIdsAtom,
  maximizeAtom,
  rasterCheckedAtom,
} from "../atom/atom";

function LayersAccordion() {
  const [labelIds] = useAtom(mapLabelIdsAtom);
  const [maximize] = useAtom(maximizeAtom);

  const [checkedRaster] = useAtom(rasterCheckedAtom);
  const [checkedContours] = useAtom(checkedGroupAtom);
  return (
    <>
      {maximize && (
        <Stack dir="rtl" mt={"sm"} mr={"sm"}>
          <Accordion transitionDuration={500}>
            <Accordion.Item value="vector-layers">
              <Accordion.Control>
                <Stack>
                  <Text>لایه های وکتوری</Text>
                  {checkedContours.length > 0 ? (
                    <Group>
                      {checkedContours.map((contourLabel, index) => (
                        <Badge key={index} c={"#667085"}>
                          {contourLabel}
                        </Badge>
                      ))}
                    </Group>
                  ) : null}
                </Stack>
              </Accordion.Control>
              <Accordion.Panel>
                <ContourLayers />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="raster-layers">
              <Accordion.Control>
                <Stack>
                  <Text>لایه های رستری</Text>
                  {checkedRaster && (
                    <Badge c={"#667085"}>{checkedRaster}</Badge>
                  )}
                </Stack>
              </Accordion.Control>
              <Accordion.Panel>
                <RasterLayers />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="base-map">
              <Accordion.Control>
                <Stack>
                  <Text>نقشه ‌پایه</Text>
                  {labelIds.length > 0 && (
                    <Badge c={"#667085"}>{labelIds}</Badge>
                  )}
                </Stack>
              </Accordion.Control>
              <Accordion.Panel>
                <BaseMaps defaultStyleLabel="Few Details" />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      )}
    </>
  );
}
export default LayersAccordion;