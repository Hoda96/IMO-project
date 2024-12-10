import { Checkbox, Group, Image, Stack, Text } from "@mantine/core";
import { mapStylesSourcesType } from "../../shared/type";
import { mapStylesSources } from "./base-map-styles";
import { useAtom } from "jotai";
import { mapLabelIdsAtom, mapStyleAtom } from "../../atom/atom";
import { useEffect, useState } from "react";

interface BaseMapsProps {
  defaultStyleLabel?: string;
}
function BaseMaps({ defaultStyleLabel }: BaseMapsProps) {
  const [, setMapStyle] = useAtom(mapStyleAtom);
  const [, setLabelIds] = useAtom(mapLabelIdsAtom);
  const [checked, setChecked] = useState<string>(defaultStyleLabel || "");

  useEffect(() => {
    if (defaultStyleLabel) {
      const defaultMapStyle = mapStylesSources.find(
        (style) => style.labelID === defaultStyleLabel
      );
      if (defaultMapStyle) {
        setChecked(defaultStyleLabel);
        setMapStyle({
          type: defaultMapStyle.type,
          source: defaultMapStyle.source,
        });
        setLabelIds(defaultMapStyle.labelID);
      }
    }
  }, [defaultStyleLabel, setMapStyle, setLabelIds]);

  const vectorPreview = mapStylesSources
    .filter((mapStyle: mapStylesSourcesType) => mapStyle.type === "vector")
    .map((style: mapStylesSourcesType) => (
      <Group key={style.source} justify="space-between">
        <Checkbox
          label={style.labelID}
          value={style.labelID}
          checked={checked === style.labelID}
          size="xs"
          onChange={() => {
            setChecked(style.labelID);
            setMapStyle({ type: style.type, source: style.source });
            setLabelIds(style.labelID);
          }}
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
        <Checkbox
          label={style.labelID}
          value={style.labelID}
          checked={checked === style.labelID}
          size="xs"
          onChange={() => {
            setChecked(style.labelID);
            setMapStyle({ type: style.type, source: style.source });
            setLabelIds(style.labelID);
          }}
        />
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
export default BaseMaps;