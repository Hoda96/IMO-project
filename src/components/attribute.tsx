import { Group, Divider, Text } from "@mantine/core";
import style from "../style/style.module.css";
export default function Attribute() {
  return (
    <Group className={style["attribute"]}>
      <Text size="11px" c="#FFFFFF" mt={4}>
        ©OpenStreetMap
      </Text>
      <Divider orientation="vertical" />
      <Text size="11px" mt={4} c="#FFFFFF">
        ©Map
      </Text>
      <Divider orientation="vertical" />
      <Text size="11px" c="#FFFFFF">
        .تمام حقوق متعلق به مپ است
      </Text>
    </Group>
  );
}
