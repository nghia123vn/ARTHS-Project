import { memo, useEffect } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_SUCCESS } from "@/assets";
import { CustomHeader } from "@/components/CustomHeader";
import { navigateToOrderScreen, replaceToMain } from "@/utils/navigation";
import { useNavigationParams } from "@/hooks";
import { BackHandler, View } from "react-native";
import { EOrderStatus } from "@/store/order/type";

export interface PaymentStatusParams {
  status: "success" | "fail";
}

export const PaymentStatus = memo(function PaymentStatus() {
  const { status } = useNavigationParams<PaymentStatusParams>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <FullScreenWrapper>
      <CustomHeader title={"Trạng thái thanh toán"} />
      <SContainer>
        {
          status === "success" ? (
            <><SImage source={IC_SUCCESS} />
              <SText>Đặt hàng thành công</SText>
              <SText>Đơn hàng sẽ được đóng gói và giao hàng ngay đến với bạn</SText></>
          ) : (
            <>
              <SText>Thanh toán thất bại</SText>
              <SText>Đơn hàng sẽ được quay về trạng thái "Chờ xử lí"</SText></>
          )
        }
        <View style={{
          gap: 20
        }}>
          <SButton onPress={() => {
            replaceToMain();
          }}>
            <SText>Trang chủ</SText>
          </SButton>
          <SButton onPress={() => {
            replaceToMain();
            navigateToOrderScreen({
              defaultStatus:EOrderStatus.PENDING
            });
          }}>
            <SText>Danh sách đơn mua</SText>
          </SButton>
        </View>
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  background-color: rgba(255, 67, 0, 0.50);
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  flex: 1;
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
  width: 224px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 12px;
  border: 2px solid #FFF;
  background: #BD3505;
`;
