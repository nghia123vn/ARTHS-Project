import {memo} from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from "styled-components/native";
import { Colors } from "@/theme";

const Dot = memo(
  ({
     index,
     animatedOffset,
     width,
   }: {
    index: number;
    animatedOffset: SharedValue<number>;
    width: number;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity:
          animatedOffset.value > (index + 1) * width ||
          (index - 1) * width > animatedOffset.value
            ? 0.35
            : interpolate(
              animatedOffset.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.35, 1, 0.35],
            ),
      };
    }, [index, width]);

    return <SDotView key={index} style={animatedStyle} />;
  },
);

interface Props {
  numberOfItems?: number;
  animatedOffset: SharedValue<number>;
  width: number;
}

export const Pagination = memo(
  ({numberOfItems = 3, animatedOffset, width}: Props) => {
    if (numberOfItems === 0) {
      return null;
    }

    return (
      <SWrapper>
        {Array.from({length: numberOfItems}, (_, index) => index + 1).map(
          (_, index) => (
            <Dot
              animatedOffset={animatedOffset}
              width={width}
              index={index}
              key={index}
            />
          ),
        )}
      </SWrapper>
    );
  },
);

const SWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  flex-direction: row;
`;

const SDotView = styled(Animated.View)`
  width: 12px;
  height: 4px;
  margin-right: 4px;
  border-radius: 3px;
  background-color: ${Colors.primary};
`;
