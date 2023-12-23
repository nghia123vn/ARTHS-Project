import React, { memo } from "react";
import styled from "styled-components/native";
import { ImageSourcePropType } from "react-native";

export interface TabBarIconProps {
  icon: ImageSourcePropType;
  isFocused: boolean;
}

export const TabBarIcon = memo(function TabBarIcon({
                                                               icon,
                                                               isFocused
                                                             }: TabBarIconProps) {
  return <Icon source={icon} isFocused={isFocused} />;
});

const Icon = styled.Image<{ isFocused: boolean }>`
  width: 24px;
  height: 24px;
  tint-color: ${(p) =>
          p.isFocused ? "#0063f5" : "#000000"}
`;
