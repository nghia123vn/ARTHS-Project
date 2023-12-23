import React, { memo } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { SDefaultTabView, TabViewItem } from "@/components/Tabs/TabView";
import { FinishedServicesScreen } from "@/screens/ServicesScreen/FinishedServices";
import { ProcessServices } from "@/screens/ServicesScreen/ProcessServices";
import { RepairingServicesScreen } from "@/screens/ServicesScreen/RepairingServices";

export const ServicesScreen = memo(function ServicesScreen() {
  return (<FullScreenWrapper>
    <CustomHeader isBack title={"Các đơn hàng sửa chữa"} />
    <SContainer>
      <SDefaultTabView locked={true}>
        <TabViewItem tabLabel={"Cần sửa chữa"}>
          <ProcessServices />
        </TabViewItem>
        <TabViewItem tabLabel={"Đang sửa chữa"}>
          <RepairingServicesScreen />
        </TabViewItem>
        <TabViewItem tabLabel={"Đã hoàn thành"}>
          <FinishedServicesScreen />
        </TabViewItem>
      </SDefaultTabView>
    </SContainer>
  </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background-color: #fafafa;
  padding: 12px 0;
  gap: 20px;
`;
