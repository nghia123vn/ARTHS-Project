import { Colors } from "@/theme";
import React, { memo } from "react";
import { RefreshControlProps } from "react-native";
import { useTheme } from "styled-components";
import { RefreshControl } from "react-native-gesture-handler";
import { memoForwardRef } from "@/utils/functions";

enum ThemeNameEnum {
  dark = "dark",
  light = "light",
}

interface Props extends Omit<RefreshControlProps, "tintColor"> {
  tintColorDark?: string;
  tintColorLight?: string;
}
export const BaseRefreshControl = memoForwardRef(
  ({ tintColorDark, tintColorLight, ...props }: Props, ref: any) => {
    const theme = useTheme();
    const tintColor =
      theme.name === ThemeNameEnum.dark
        ? tintColorDark ?? Colors.white
        : tintColorLight;

    return (
      <RefreshControl
        {...props}
        ref={ref}
        tintColor={tintColor}
        shouldCancelWhenOutside={true}
        disallowInterruption={false}
      />
    );
  }
);
