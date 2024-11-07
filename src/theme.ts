import { Checkbox, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  // colors: {
  //   mantineColor: [
  //     "#e9efff",
  //     "#d0dbff",
  //     "#a0b3fd",
  //     "#6c88f8",
  //     "#4064f4",
  //     "#244ef3",
  //     "#1242f3",
  //     "#0135d9",
  //     "#002ec3",
  //     "#0026ac",
  //   ],
  // },
  fontFamily: "IRANSansWebFa",

  components: {
    ActionIcon: {
      defaultProps: {
        size: "lg",
        variant: "light",
        style: {
          color: "#101828",
        },
      },
    },
    Tooltip: {
      defaultProps: {
        position: "bottom",
        offset: 15,
      },
    },
    Button: {
      defaultProps: {
        variant: "light",
        miw: rem(38),
        mah: rem(36),
        style: {
          fontWeight: 400,
          paddingInline: "4px",
          color: "#101828",
        },
      },
    },
    Accordion: {
      defaultProps: {
        w: rem(300),
        mx: "auto",
        bg: "#fff",
        pos: "absolute",

        style: {
          boxShadow: "0px 1px 4px 0px rgba(12, 12, 13, 0.1)",
          borderRadius: 6,
        },
      },
    },
    Select: {
      defaultProps: {
        style: { width: rem(90) },
        styles: {
          option: { fontSize: "12px" },
          input: { paddingInlineEnd: "32px", paddingInlineStart: "2px" },
        },
      },
    },
  },
});
