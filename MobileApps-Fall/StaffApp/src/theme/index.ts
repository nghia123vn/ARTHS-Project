import { DefaultTheme } from "styled-components/native";

export const Colors = {
  primary:"#BD3505",
  white: "#FFFFFF",
  black: "#000000",
  grey1: "#242424",
  grey2: "#666666",
  grey3: "#C7C7C7",
  grey4: "#E3E3E3",
  grey5: "#EBEBEB",
  grey6: "#F5F5F5",
  grey7: "#FAFAFA",
  blue1: "#267CDE",
  blue2: "#A8CBF2",
  blue3: "#E9F2FC",
  // green: '#129A4B',
  green1: "#05944F",
  green2: "#9BD4B9",
  green3: "#E6F4ED",
  orange1: "#FA8C16",
  orange2: "#FFD699",
  orange3: "#FFF5E6",
  red1: "#CF1322",
  red2: "#F6A9A9",
  red3: "#FEEDEB",
  // red4: '#E92929',
  // red5: '#FDE7E9',
  purple1: "#AB71BD",
  yellow1: "#ECD92D",
  greenCyan: "#1EC2A5",
};

// @ts-ignore
export const styledValue: DefaultTheme = new Proxy(
  {},
  {
    get(target, p: PropertyKey): any {
      return (props: any) => {
        return props.theme?.[p];
      };
    },
  }
);
