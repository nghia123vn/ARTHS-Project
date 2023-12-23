import React, { memo } from "react";
import styled from "styled-components/native";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { IC_BELL, IC_CART, IC_LOGO, IC_MARKET } from "@/assets";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { View } from "react-native";
import { navigateToCartScreen, navigateToNotificationScreen } from "@/utils/navigation";
import { Fonts } from "@/theme/Fonts";


export const CustomHeaderTab = memo(function CustomHeaderTab() {
  const { aTop } = useAnimatedSafeAreaInsets();
  const animatedPaddingTop = useAnimatedStyle(() => ({
    paddingTop: aTop.value
  }));
  return (
    <SContainer style={animatedPaddingTop}>
      <FlexSpaceBetween>
        <View />
        <SImage source={IC_LOGO} />
        <FlexCenter>
          <SButton onPress={navigateToNotificationScreen}>
            <SIcon source={IC_BELL}/>
          </SButton>
        </FlexCenter>
      </FlexSpaceBetween>
    </SContainer>

  );
});
const SContainer = styled(Animated.View)`
margin: 0 16px;
`;
const SImage = styled.Image`
  width: 105px;
  height: 54px;
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
const SIcon = styled.Image`
width: 24px;
  height: 24px;
`
const SCartLengths =  styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: #BD3505;
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  
`
const STextWhite = styled.Text`
  color: #FFFFFF;
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 8px;
  letter-spacing: 0.2px;
`
