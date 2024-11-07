import { Checkbox, Group, Image, Stack, Text } from "@mantine/core";
import { mapStylesSourcesType } from "../../shared/type";
import { mapStylesSources } from "./base-map-styles";
import { useAtom } from "jotai";
import { mapStyleAtom } from "../../atom/atom";

export default function BaseMaps() {
  const [, setMapStyle] = useAtom(mapStyleAtom);
  const updateMapStyleAtom = () => {
    return (newSource: string) => {
      const newUrl = `https://map.ir/vector/styles/main/${newSource}.json`;
      setMapStyle(newUrl);
    };
  };

  const vectorPreview = mapStylesSources
    .filter((mapStyle: mapStylesSourcesType) => mapStyle.type === "vector")
    .map((style: mapStylesSourcesType) => (
      <Group key={style.source} justify="space-between">
        <Checkbox
          label={style.labelID}
          size="xs"
          onClick={() => updateMapStyleAtom()(style.source)}
        />
        <Image
          radius="md"
          w={"35px"}
          h={"35px"}
          src={`/assets/img/${style.source}.png`}
        />
      </Group>
    ));

  const rasterPreview = mapStylesSources
    .filter((mapStyle: mapStylesSourcesType) => mapStyle.type === "raster")
    .map((style: mapStylesSourcesType) => (
      <Group key={style.source} justify="space-between">
        <Checkbox label={style.labelID} size="xs" />
        <Image
          radius="md"
          w={"35px"}
          h={"35px"}
          src={`/assets/img/${style.source}.png`}
        />
      </Group>
    ));

  return (
    <Stack>
      <Text size="sm">استایل‌های بردار</Text>
      <Stack dir="ltr">{vectorPreview}</Stack>
      <Text size="sm">استایل‌های تصویر</Text>
      <Stack dir="ltr">{rasterPreview}</Stack>
    </Stack>
  );
}
