import React, { memo } from "react";
import styled from "styled-components/native";
import { CustomHeaderTab } from "@/components/CustomHeaderTab";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { View } from "react-native";
import { IC_LOCATION } from "@/assets";
import { FlexCenter } from "@/helper/styles";
import { Fonts } from "@/theme/Fonts";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { navigateToCreateBookingScreen } from "@/utils/navigation";
import { MeetingBooking } from "@/screens/BookingScreen/MeetingBooking";
import { HistoryBooking } from "@/screens/BookingScreen/HistoryBooking";

export const BookingScreen = memo(function BookingScreen() {
  const [selectedTab, setSelectedTab] = React.useState(1);
  return (
    <FullScreenWrapper>
      <CustomHeaderTab />
      <SContainer>
        <SInfoWrapper>
          <FlexCenter style={{
            alignItems: "flex-start",
            maxWidth:'90%'
          }} gap={8}>
            <SIcon source={IC_LOCATION} />
            <View>
              <STextBold>Địa chỉ cửa hàng</STextBold>
              <STextNormal>73/16 Phạm Văn Chiêu
                Phường 2, Quận Gò Vấp, TP. Hồ Chí Minh</STextNormal>
            </View>
          </FlexCenter>
          <FlexCenter gap={8}>
            <View style={{
              width: 20,
              height: 20
            }} />
            <View>
              <STextBold>Giờ làm việc</STextBold>
              <STextNormal>8:00 - 18:00</STextNormal>
            </View>
          </FlexCenter>
        </SInfoWrapper>
        <FlexCenter gap={4}>
          <STabWrapper onPress={() => {
            setSelectedTab(1);
          }} active={selectedTab === 1}>
            <STextNormal>Lịch hẹn</STextNormal>
          </STabWrapper>
          <STabWrapper onPress={() => {
            setSelectedTab(2);
          }} active={selectedTab === 2}>
            <STextNormal>Lịch sử đặt lịch</STextNormal>
          </STabWrapper>
        </FlexCenter>
        {selectedTab === 1 ? <MeetingBooking /> : <HistoryBooking />}
        <SActionButton onPress={navigateToCreateBookingScreen}>
          <STextButton>Tạo Lịch Hẹn</STextButton>
        </SActionButton>
        <AnimatedBottomSpace />
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 20px;
  padding:20px 0;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
const SInfoWrapper = styled.View`
  padding: 12px;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid #000;
  background: #FFF;
  box-shadow: 0 -8px 12px rgba(0, 0, 0, 0.03);
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const STabWrapper = styled.TouchableOpacity<{ active: boolean }>`
  width: 50%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  background: ${({ active }) => active ? "#fff" : "rgba(131, 131, 131, 0.23)"};
  border-radius: 20px;
  border: 1px solid #000;
`;

const SActionButton = styled.TouchableOpacity`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 12px;
  bottom: 80px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #BD3505;
`;
const STextButton = styled(STextNormal)`
  color: white;
`;
