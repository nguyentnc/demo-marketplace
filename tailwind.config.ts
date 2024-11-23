import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{jsx,tsx}",
    "./src/layouts/**/*.{jsx,tsx}",
    "./src/utils/constants/ui.ts",
    "./src/configs/datepicker.config.ts",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "960px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1.5625rem",
        // md: '4.96875rem',
        // sm: '1.25rem',
        lg: "7.5rem",
        // xl: '1.5625rem',
      },

      screens: {
        md: "960px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1920px",
      },
      center: true,
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      banner: "380 / 201",
      bannerDesktop: "1088 / 400",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },

    extend: {
      blur: {
        xs: "1px",
      },
      colors: () => ({
        current: "currentColor",
        primary: {
          DEFAULT: "#0A47FF",
          variant: {
            1: "#0038E0",
            2: "#002EB8",
          },
          1: "#EBF0FF",
          2: "#ADC2FF",
          3: "#85A3FF",
          4: "#5C85FF",
          5: "#3164FF",
          6: "#0A47FF",
          7: "#0038E0",
          8: "#002EB8",
          9: "#00248F",
          10: "#001966",
        },
        secondary: {
          DEFAULT: "#FF801F",
          variant: {
            1: "#F56A00",
            2: "#CC5800",
          },
          1: "#FFF3EB",
          2: "#FFDCC2",
          3: "#FFC599",
          4: "#FFAE70",
          5: "#FF9747",
          6: "#FF801F",
          7: "#F56A00",
          8: "#CC5800",
          9: "#A34700",
          10: "#7A3500",
        },
        neutral: {
          DEFAULT: "#868691",
          white: "#FFFFFF",
          "white-20": "rgba(255,255,255, 0.2)",
          10: "#F4F5F6",
          20: "#EAEBF1",
          30: "#D1D1D8",
          40: "#9D9DA8",
          50: "#868691",
          60: "#6A6A75",
          70: "#565661",
          80: "#404047",
          90: "#29292E",
          100: "#17171A",
          black: "#121212",
          "black-20": "rgba(0,0,0, 0.2)",
        },
        accent: {
          DEFAULT: "#0CA9B1",
          10: "#F2F9FA",
          20: "#D3EBEE",
        },
        variant: {
          DEFAULT: "#D0FF6D",
        },
        theme: {
          gray: {
            50: "#F8F8F8",
            100: "#F2F2F2",
            200: "#D9D9D9",
            300: "#BFBFBF",
            400: "#cccccc",
            700: "#404040",
            900: "#262626",
            green: {
              100: "#F1F3F2",
              200: "#BBC4BE",
              400: "#84948A",
              500: "#6B7B71",
              600: "#535F58",
            },
            scale: {
              300: "#BFBFBF",
              400: "#A6A6A6",
              500: "#8C8C8C",
              700: "#595959",
              900: "#262626",
            },
          },
          black: {
            DEFAULT: "#181818",
            variant: {
              1: "#212121",
              2: "#343434",
            },
          },
          white: {
            DEFAULT: "#FCFCFC",
            variant: {
              1: "#F1F1F1",
              2: "#CECECE",
              3: "#E0E0E0",
            },
          },
          palette: {
            1: "#000814",
            2: "#001D3D",
            3: "#003566",
            4: "#FFC300",
            5: "#FFD60A",
          },
        },
        semantic: {
          warning: "#FFA41C",
          success: "#28BD68",
          error: "#F64A4A",
        },
        common: {
          white: "#fff",
          description: "#999999",

          border: "#D9D9D9",
          info: "#1890FF",
          warning: "#F3BB00",
          success: "#33C765",
          error: "#F55B64",

          disabled: "#999797",
          subtitle: "#414141",
          icon: {
            DEFAULT: "#fff",
            social: "#717378",
            light: "#5E6166",
          },
        },
      }),
      fontSize: {
        DEFAULT: ["0.875rem", "150%"],
        xxs: ["0.625rem", "150%"],
        base: ["0.875rem", "150%"],
        md: ["1rem", "150%"],
        lg: ["1.125rem", "150%"],
        xl: ["1.25rem", "150%"],
        "2xl": ["1.5rem", "150%"],
      },
      borderRadius: {
        md: "0.25rem",
      },
      borderColor: {
        DEFAULT: "rgba(0,0,0, 0.2)",
      },
      backgroundImage: {},
      boxShadow: {
        "bottom-bar": "0px 0px 30px 10px rgba(0, 0, 0, 0.1)",
        "basic-tab":
          "0px 2px 4px rgba(151, 151, 151, 0.3), 0px 32px 32px rgba(217, 217, 217, 0.2)",
        card: "0px 0px 40px 0px rgba(0, 0, 0, 0.1)",
        toast:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        tooltip: "0px 0px 10px 5px rgba(0,0,0,0.1)",
        "fixed-content": "0 4px 16px -4px rgba(69,88,115,.2)",
      },

      zIndex: {
        bannerHeader: "0",
        header: "11",
        "header-mobile": "15",
        mainFixedlayout: "14",
        headerMenu: "15",
        popover: "20",
        subheader: "29",
        modal: "999",
        tooltip: "200",
        headerFix: "50",
        footer: "50",
        bottomBar: "99",
      },
      maxWidth: {
        "action-content": "45rem",
      },
      spacing: {
        "top-content": "1.875rem",
        section: "5rem",
        content: "7.5rem",
      },

      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },

      transitionProperty: {
        height: "height",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [],
} satisfies Config;
