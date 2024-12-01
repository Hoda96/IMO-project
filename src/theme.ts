import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
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
    // Modal: {
    //   defaultProps: {
    //     styles: {
    //       content: {
    //         position: "absolute",
    //         left: "calc(75rem)",
    //       },
    //     },
    //   },
    // },
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
    Badge: {
      defaultProps: {
        size: "lg",
        radius: "lg",
        color: "#F7F7F8",
        style: {
          fontSize: 12,
          fontWeight: 600,
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
    Paper: {
      defaultProps: {
        w: rem(160),
        p: "sm",
        pos: "absolute",
        bottom: rem(12),
        left: rem(12),
        style: {
          boxShadow: "0px 1px 4px 0px rgba(12, 12, 13, 0.1)",
          backgroundColor: "rgba(247, 247, 248, 0.6)",
        },
      },
    },
  },
});
