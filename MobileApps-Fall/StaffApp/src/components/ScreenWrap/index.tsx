import React, { memo } from "react";
import { ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useAnimatedWindow } from "@/context/AnimatedWindowContext";
import styled from "styled-components/native";

interface ScreenProps {
  isGrey?: boolean;
}
export const FullScreenWrapper = memo((props: ViewProps & ScreenProps ) => {
  const { height, width } = useAnimatedWindow();
  const animatedStyles = useAnimatedStyle(() => ({
    minHeight: withTiming(height.value, { duration: 100 }),
    width: withTiming(width.value, { duration: 100 }),
  }));

  return (
    <SFullContainer style={[animatedStyles,{
      backgroundColor: props.isGrey ? "#FAFAFA" : "white"
    }]} {...props} >
      {props.children}
    </SFullContainer>
  );
});

export const ScreenWrapper = memo((props: ViewProps) => {
  return (
    <SContainer>
      {props.children}
    </SContainer>
  );
});

const SFullContainer = styled(Animated.View)`
  background-color: white;
`;

const SContainer = styled.View`
  background-color: white;
  flex: 1;
`;
