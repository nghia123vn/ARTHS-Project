import React, { memo, } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { SDefaultTabView, TabViewItem } from "@/components/Tabs/TabView";
import { TodayBookings } from "@/screens/BookingScreen/TodayBookings";
import { AllBookings } from "@/screens/BookingScreen/AllBookings";

export const BookingScreen = memo(function BookingScreen() {

  return (<FullScreenWrapper>
    <CustomHeader isBack title={"Các đơn đặt lịch hôm nay"} />
    <SContainer>
      <SDefaultTabView locked={true}>
        <TabViewItem tabLabel={"Hôm nay"}>
          <TodayBookings />
        </TabViewItem>
        <TabViewItem tabLabel={"Toàn bộ"}>
          <AllBookings />
        </TabViewItem>
      </SDefaultTabView>
    </SContainer>
  </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background-color: #fafafa;
  gap: 20px;
`;
