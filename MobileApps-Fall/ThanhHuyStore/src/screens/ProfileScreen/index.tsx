import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import { CustomHeaderTab } from "@/components/CustomHeaderTab";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { Fonts } from "@/theme/Fonts";
import { TouchableOpacity, View } from "react-native";
import { IC_BOX_TIME, IC_INVOICE, IC_PROFILE, IC_STAR_OUTLINED, IC_TRUCK, IC_WARNING } from "@/assets";
import { navigateToDetailAccountScreen, navigateToOrderScreen, replaceToLoginScreen } from "@/utils/navigation";
import { removeToken } from "@/utils/loginHandle";
import { useAccount } from "@/zustand/account";
import { EOrderStatus } from "@/store/order/type";
import { useOrderByQuery } from "@/store/order";
import { requestListOrders } from "@/store/order/function";


export const ProfileScreen = memo(function ProfileScreen() {
  const account = useAccount();

  const listOrders = useOrderByQuery(EOrderStatus.PROCESSING);
  useEffect(() => {
    requestListOrders({
      customerId: account?.id,
      status: EOrderStatus.PROCESSING
    }).then();
  }, []);
  const onLogout = useCallback(async () => {
    await removeToken();
    replaceToLoginScreen();
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeaderTab />
      <SContainer>
        <SInfoWrapper>
          <SAvatarWrapper source={{uri:account.avatar || ''}} />
          <View>
            <STextWhite>{account.fullName || "Undefined"}</STextWhite>
            <STextWhite>{`SDT: ${account.phoneNumber}`}</STextWhite>
          </View>
        </SInfoWrapper>
        <TouchableOpacity onPress={() => {
          navigateToOrderScreen({
            defaultStatus:EOrderStatus.PENDING
          });
        }}>
          <SBoxWrapper>
            <SFlexCenter>
              <SImage source={IC_INVOICE} />
              <STextNormal>Đơn Mua</STextNormal>
            </SFlexCenter>
            <STextNormal style={{
              fontSize: 10
            }}>Xem lịch sử mua hàng</STextNormal>
          </SBoxWrapper>
        </TouchableOpacity>
        <SBoxWrapperCustom>
          <SFlexView onPress={() => {
            navigateToOrderScreen({
              defaultStatus: EOrderStatus.PENDING
            });
          }}>
            <SImage source={IC_BOX_TIME} />
            <STextNormal>Chờ xác nhận</STextNormal>
          </SFlexView>
          <SFlexView onPress={() => {
            navigateToOrderScreen({
              defaultStatus: EOrderStatus.PROCESSING
            });
          }}>
            {listOrders.length > 0 ? <SCartLengths>
              <STextNoti>{listOrders.length}</STextNoti>
            </SCartLengths> : null}
            <SImage source={IC_TRUCK} />
            <STextNormal>Đang giao</STextNormal>
          </SFlexView>
          <SFlexView onPress={() => {
            navigateToOrderScreen({
              defaultStatus: EOrderStatus.TRANSFER
            });
          }}>
            <SImage source={IC_STAR_OUTLINED} />
            <STextNormal>Đánh giá</STextNormal>
          </SFlexView>
        </SBoxWrapperCustom>
        <SBoxWrapper style={{
          justifyContent: "flex-start"
        }}>
          <SFlexCenter onPress={navigateToDetailAccountScreen}>
            <SImage source={IC_PROFILE} />
            <STextNormal>Thông tin tài khoản</STextNormal>
          </SFlexCenter>
        </SBoxWrapper>
        <SBoxWrapper style={{
          justifyContent: "flex-start"
        }}>
          <SFlexCenter>
            <SImage source={IC_WARNING} />
            <STextNormal>Thông tin cửa hàng</STextNormal>
          </SFlexCenter>
        </SBoxWrapper>
        <SBoxWrapper style={{
          justifyContent: "flex-start"
        }}>
          <SFlexCenter>
            <SImage source={IC_WARNING} />
            <STextNormal>Chính sách bảo hành</STextNormal>
          </SFlexCenter>
        </SBoxWrapper>
        <SLogoutButton onPress={onLogout}>
          <STextNormal>Đăng xuất</STextNormal>
        </SLogoutButton>
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #FAFAFA;
  gap: 20px;
  padding-top: 20px;
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
const SAvatarWrapper = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
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
const SBoxWrapperCustom = styled.View`
  flex-direction: row;
  background: #FFF;
  justify-content: space-between;
  padding: 12px 20px;
  border-radius: 20px;
  border: 1px solid #000;
  box-shadow: 0 -8px 12px rgba(0, 0, 0, 0.03);
  margin: 0 8px;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const SFlexCenter = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  gap: 8px
`;
const SFlexView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const SLogoutButton = styled.TouchableOpacity`
  display: flex;
  padding: 12px;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #0C1A30;
`;
const SCartLengths = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: #FE3A30;
  z-index: 10;
  position: absolute;
  top: -4px;
  right: calc(50% - 12px);
  justify-content: center;
  align-items: center;
`;
const STextNoti = styled.Text`
  color: #FFFFFF;
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 8px;
  letter-spacing: 0.2px;
`;
