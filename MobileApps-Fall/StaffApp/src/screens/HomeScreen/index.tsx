import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import { CustomHeaderTab } from "@/components/CustomHeaderTab";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { Fonts } from "@/theme/Fonts";
import { TouchableOpacity, View } from "react-native";
import { IC_ARROW, IC_INVOICE, IC_PERSONAL_CARD, IC_PROFILE, IC_WARNING } from "@/assets";
import { FlexCenter } from "@/helper/styles";
import {
  navigateToBookingScreen,
  navigateToDetailAccountScreen,
  navigateToLoginScreen,
  navigateToServicesScreen
} from "@/utils/navigation";
import { removeToken } from "@/utils/loginHandle";
import { useAccount } from "@/zustand/account";
import { requestAccountDetail } from "@/zustand/account/function";


export const HomeScreen = memo(function HomeScreen() {
  const account = useAccount();

  const onLogout = useCallback(async () => {
    await removeToken();
    navigateToLoginScreen();
  }, []);

  useEffect(() => {
    requestAccountDetail().then();
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeaderTab />
      <SContainer>
        <SInfoWrapper>
          <SAvatarWrapper>
            <SAvatar source={{uri:account.avatar}} />
          </SAvatarWrapper>
          <View>
            <STextWhite>{account.fullName || "Undefined"}</STextWhite>
            <STextWhite>{`SDT: ${account.phoneNumber}`}</STextWhite>
          </View>
        </SInfoWrapper>
        <SSectionWrapper>
          <TouchableOpacity onPress={navigateToBookingScreen}>
            <SBoxWrapper>
              <SFlexCenter>
                <SImage source={IC_INVOICE} />
                <STextNormal>Danh sách đặt lịch</STextNormal>
              </SFlexCenter>
              <SArrowIcon source={IC_ARROW} />
            </SBoxWrapper>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToServicesScreen}>
            <SBoxWrapper>
              <SFlexCenter>
                <SImage source={IC_PERSONAL_CARD} />
                <STextNormal>Danh sách đặt hàng</STextNormal>
              </SFlexCenter>
              <SArrowIcon source={IC_ARROW} />
            </SBoxWrapper>
          </TouchableOpacity>
          <SBoxWrapper style={{
            justifyContent: "flex-start",
            marginTop: 40
          }}>
            <TouchableOpacity onPress={navigateToDetailAccountScreen}>
              <SFlexCenter>
                <SImage source={IC_PROFILE} />
                <STextNormal>Thông tin tài khoản</STextNormal>
              </SFlexCenter>
            </TouchableOpacity>
          </SBoxWrapper>
          <SBoxWrapper style={{
            justifyContent: "flex-start",
            marginTop: 4
          }}>
            <SFlexCenter>
              <SImage source={IC_WARNING} />
              <STextNormal>Thông tin cửa hàng</STextNormal>
            </SFlexCenter>
          </SBoxWrapper>
          <SBoxWrapper style={{
            justifyContent: "flex-start",
            marginTop: 4
          }}>
            <SFlexCenter>
              <SImage source={IC_WARNING} />
              <STextNormal>Chính sách bảo hành</STextNormal>
            </SFlexCenter>
          </SBoxWrapper>
        </SSectionWrapper>

        <SLogoutButton onPress={onLogout}>
          <STextNormal>Đăng xuất</STextNormal>
        </SLogoutButton>
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #E8E8E8;
  gap: 20px;
  margin-top: 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 15px;
  line-height: 25px; /* 156.25% */
  letter-spacing: 0.061px;
`;
const STextBold = styled(STextNormal)`
  font-family: ${Fonts.Bold};

`;
const SInfoWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  padding: 12px 20px;
  background-color: #BD3505;
`;
const SAvatarWrapper = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const STextWhite = styled(STextNormal)`
  color: #fff;
`;
const SBoxWrapper = styled.View`
  flex-direction: row;
  background: #FFF;
  justify-content: space-between;
  padding: 12px 20px;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const SAvatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 20px;
`;
const SFlexCenter = styled(FlexCenter)`
  gap: 8px
`;
const SFlexView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const SArrowIcon = styled.Image`
  width: 16px;
  height: 16px
`;
const SLogoutButton = styled.TouchableOpacity`
  display: flex;
  padding: 12px;
  margin: 0 20px 20px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #0C1A30;
`;
const SSectionWrapper = styled.View`
  flex: 1;
`;
