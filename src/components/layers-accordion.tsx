import { Accordion, Stack, Text, Badge } from "@mantine/core";
import ContourLayers from "./contour-layers";
import RasterLayers from "./raster-layers";
import BaseMaps from "./base-map/base-maps";
import { useAtom } from "jotai";
import { mapLabelIdsAtom, maximizeAtom } from "../atom/atom";

export default function LayersAccordion() {
  const [labelIds] = useAtom(mapLabelIdsAtom);
  const [maximize] = useAtom(maximizeAtom);
  return (
    <>
      {maximize && (
        <Stack dir="rtl" mt={"sm"} mr={"sm"}>
          <Accordion transitionDuration={500}>
            <Accordion.Item value="vector-layers">
              <Accordion.Control>
                <Stack>
                  <Text>لایه های وکتوری</Text>
                </Stack>
              </Accordion.Control>
              <Accordion.Panel>
                <ContourLayers />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="raster-layers">
              <Accordion.Control>لایه های رستری</Accordion.Control>
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
                <BaseMaps />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      )}
    </>
  );
}
