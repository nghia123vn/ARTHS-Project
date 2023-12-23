import React, { memo } from "react";
import styled from "styled-components/native";
import { FlexSpaceBetween } from "@/helper/styles";
import { IC_BACK } from "@/assets";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { goBack } from "@/utils/navigation";
import { View } from "react-native";
import { Fonts } from "@/theme/Fonts";

interface HeaderProps {
  isBack?: boolean;
  title?: string;
  rightComponent?: React.ReactNode;
}

export const CustomHeader = memo(function CustomHeader(props: HeaderProps) {
  const { isBack, title,rightComponent } = props;
  const { aTop } = useAnimatedSafeAreaInsets();
  const animatedPaddingTop = useAnimatedStyle(() => ({
    paddingTop: aTop.value
  }));
  return (
    <SContainer style={animatedPaddingTop}>
      <FlexSpaceBetween>
        {isBack ? <SButton onPress={goBack}>
          <SImage source={IC_BACK} />
        </SButton> : <View />}
        {
          title ? <STitle>{title}</STitle> : <View />
        }
        {rightComponent ? rightComponent : <View/>}
      </FlexSpaceBetween>
    </SContainer>
  );
});
const SContainer = styled(Animated.View)`
  padding: 12px 16px;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;

`;
const SButton = styled.TouchableOpacity.attrs(props => ({
  hitSlop: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8
  }
}))`
`;
const STitle = styled.Text`
  color: #000;
  font-family: ${Fonts.Medium};
  font-size: 16px;
`;
