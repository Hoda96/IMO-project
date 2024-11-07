import { Accordion, Stack } from "@mantine/core";
import VectorLayers from "./vector-layers";
import RasterMaps from "./raster-maps";
import BaseMaps from "./base-map/base-maps";

export default function LayersAccordion() {
  return (
    <Stack dir="rtl" mt={"sm"} mr={"sm"}>
      <Accordion transitionDuration={500}>
        <Accordion.Item value="vector-layers">
          <Accordion.Control>لایه های وکتوری</Accordion.Control>
          <Accordion.Panel >
            <VectorLayers />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="raster-layers">
          <Accordion.Control>لایه های رستری</Accordion.Control>
          <Accordion.Panel>
            <RasterMaps />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="base-map">
          <Accordion.Control>نقشه ‌پایه</Accordion.Control>
          <Accordion.Panel>
            <BaseMaps />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
