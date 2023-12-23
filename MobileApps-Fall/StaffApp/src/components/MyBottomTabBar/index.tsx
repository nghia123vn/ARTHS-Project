import { BottomTabBarProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React, { RefObject, useCallback, useImperativeHandle } from "react";
import {
  ImageSourcePropType,
  InteractionManager,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabItem } from "./BottomTabItem";
import { memoForwardRef } from "@/utils/functions";

export interface MyBottomTabBar {
  navigateToIndex: (index: number) => void;
}

interface Props extends BottomTabBarProps {
  centerElement?: JSX.Element;
}

export const MyBottomTabBar = memoForwardRef(function (
  { state, navigation, descriptors, centerElement }: Props,
  ref: RefObject<MyBottomTabBar>
) {
  const { aBottom } = useAnimatedSafeAreaInsets();
  const animatedHeight = useSharedValue(56);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      paddingBottom: aBottom.value,
      height: aBottom.value + animatedHeight.value,
    };
  }, []);

  const onItemPress = useCallback(
    ({ route, index }: { route: any; index: number }) => {
      const isFocused = state.index === index;

      InteractionManager.runAfterInteractions(() => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      });
    },
    [state, navigation]
  );

  const navigateToIndex = useCallback(
    (index: number) => {
      const _route = state.routes?.[index];

      onItemPress({ route: _route, index });
    },
    [onItemPress]
  );

  useImperativeHandle(
    ref,
    () => ({
      navigateToIndex,
    }),
    [navigateToIndex]
  );

  return (
    <SContentContainer style={animatedStyles}>
      <View style={styles.contentContainer}>
        {state.routes?.map((route: any, index: number) => (
          <BottomTabItem
            key={"tab-" + index.toString()}
            descriptors={descriptors}
            state={state}
            route={route}
            index={index}
            navigation={navigation}
            onPress={onItemPress}
          />
        ))}
      </View>
      {centerElement ? (
        <View pointerEvents={"box-none"} style={styles.centerElement}>
          {centerElement}
        </View>
      ) : null}
    </SContentContainer>
  );
});

export * from "./TabBarIcon";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  centerElement: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

const SContentContainer = styled(Animated.View)`
  background-color: white;
  border-top-width: 1px;
  border-top-color: rgba(81, 82, 108, 0.2);
  bottom: 0;
  left: 0;
  right: 0;
`;
