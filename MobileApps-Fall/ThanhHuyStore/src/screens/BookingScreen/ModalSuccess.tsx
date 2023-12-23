import { memo, useEffect } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_SUCCESS } from "@/assets";
import { FlexSpaceBetween } from "@/helper/styles";
import {
  navigateToCalendarScreen,
  navigateToDetailBookingScreen,
  navigateToMain,
  replaceToMain
} from "@/utils/navigation";
import { BackHandler } from "react-native";

interface ModalSuccessProps {
  id: string;
  hide: () => void;
}

export const ModalSuccess = memo(function ModalSuccess({ id ,hide}: ModalSuccessProps) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <SContainer>
      <SImage source={IC_SUCCESS} />
      <SText>Đặt lịch thành công</SText>
      <FlexSpaceBetween>
        <SButton onPress={() => {
          navigateToMain();
          hide()
        }}>
          <SText>Trang chủ</SText>
        </SButton>
        <SButton onPress={() => {
          navigateToMain();
          navigateToCalendarScreen();
          hide()
        }}>
          <SText>Đặt lịch</SText>
        </SButton>
      </FlexSpaceBetween>
    </SContainer>
  );
});
const SContainer = styled.View`
  background-color: rgba(255, 67, 0, 1);
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 284px;
  padding: 20px;
`;
const SImage = styled.Image`
  width: 80px;
  height: 80px;
`;
const SText = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 18px;
  font-weight: 700;
`;
const SButton = styled.TouchableOpacity`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 4px;
  border: 2px solid #FFF;
  background: #BD3505;
`;
