import React, { memo, useCallback, useMemo } from "react";
import { InteractionManager, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import styled from "styled-components/native";
import { Colors } from "@/theme";

export const BottomTabItem = memo(
  ({
    state,
    descriptors,
    route,
    index,
    onPress,
  }: Omit<BottomTabBarProps, "insets"> & {
    route: any;
    index: number;
    onPress: (props: { route: any; index: number }) => void;
  }) => {
    const { options } = descriptors[route.key];

    const label = useMemo(
      () =>
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name,
      [options]
    );

    const isFocused = useMemo(
      () => state.index === index,
      [index, state.index]
    );

    return (
      <TouchableOpacity
        //@ts-ignore
        disabled={options.disabled}
        activeOpacity={0.6}
        accessibilityRole="button"
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => onPress({ route, index })}
        style={styles.bottomBarIcon}
      >
        {options &&
          options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: "",
            size: 0,
          })}
        <Label numberOfLines={1} focused={isFocused}>
          {label ? `${label}` : ""}
        </Label>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  bottomBarIcon: {
    marginTop: 10,
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

const Label = styled.Text<{ focused: boolean }>`
  font-weight: ${(p) => (p.focused ? 'bold' : 'normal')};
  font-size: 12px;
  text-align: center;
  padding-top: 4px;
  color: ${(p) =>
    p.focused ? Colors.primary : '#000000'}
`;
