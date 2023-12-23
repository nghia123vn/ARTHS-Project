import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { IC_PHONE_ROUNED } from "@/assets";
import { useNavigationParams } from "@/hooks";
import { useBooking } from "@/store/booking";
import { Fonts } from "@/theme/Fonts";
import { ScrollView, View } from "react-native";
import moment from "moment";
import { OrderDetail } from "@/store/order/type";
import { requestOrderById } from "@/store/order/function";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { formatCurrency } from "@/utils/format";

export interface DetailBookingScreenParams {
  id: string;
}

export const DetailBookingScreen = memo(function DetailBookingScreen() {
  const { id } = useNavigationParams<DetailBookingScreenParams>();
  const data = useBooking(id);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const requestOrderOfBooking = useCallback(async () => {
    const orderId = data?.orderId;
    if (orderId) {
      const response = await requestOrderById(orderId);
      if (response) {
        setOrderDetails(response?.orderDetails || []);
      }
    }
  }, []);
  useEffect(() => {
    requestOrderOfBooking().then();
  }, []);
  const listItemsProduct = useMemo(() => {
    return orderDetails.filter(item => item.motobikeProduct);
  }, [orderDetails]);
  const listItemsService = useMemo(() => {
    return orderDetails.filter(item => item.repairService);
  }, [orderDetails]);
  const listItems = useMemo(() => {
    if (listItemsProduct.length > 0) {
      return (
        <View>
          <STextBold style={{
            marginBottom: 12
          }}>Sản phẩm</STextBold>
          {listItemsProduct.map((item, index) => {
            return (
              <FlexSpaceBetween style={{
                borderColor: "#666",
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 12,
                padding: 8
              }}>
                <FlexCenter gap={12} style={{
                  alignItems: "flex-start",
                  flex: 1
                }}>
                  <SImage source={{ uri: item?.motobikeProduct?.image || "" }} />
                  <View style={{
                    gap: 8,
                    flex: 1
                  }}>
                    <SName numberOfLines={2}>{item?.motobikeProduct?.name}</SName>
                    <STextDiscount>{formatCurrency(item?.motobikeProduct?.priceCurrent || 0)}</STextDiscount>
                    <SPrice>{formatCurrency((item?.motobikeProduct?.priceCurrent || 0) * (100 - (item?.motobikeProduct?.discountAmount || 0)) / 100)}</SPrice>
                    {item.instUsed ? <STextNormal style={{
                      color: "#0063FF"
                    }}>Thay thế tại cửa hàng</STextNormal> : null}
                  </View>
                </FlexCenter>
                <SQuantity>x{item?.quantity}</SQuantity>
              </FlexSpaceBetween>
            );
          })}
        </View>
      );
    }
    if (listItemsService.length > 0) {
      return (
        <View>
          <STextBold style={{
            marginBottom: 12
          }}>Dịch vụ</STextBold>
          {listItemsService.map((item, index) => {
            return (
              <FlexSpaceBetween style={{
                borderColor: "#666",
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 12,
                padding: 8
              }}>
                <FlexCenter gap={12} style={{
                  alignItems: "flex-start",
                  flex: 1
                }}>
                  <SImage source={{ uri: item?.repairService?.image || "" }} />
                  <View style={{
                    gap: 8,
                    flex: 1
                  }}>
                    <SName numberOfLines={2}>{item?.repairService?.name}</SName>
                    <STextDiscount>{formatCurrency(item?.repairService?.price || 0)}</STextDiscount>
                    <SPrice>{formatCurrency((item?.repairService?.price || 0) * (100 - (item?.repairService?.discountAmount || 0)) / 100)}</SPrice>
                  </View>
                </FlexCenter>
              </FlexSpaceBetween>
            );
          })}
        </View>
      );
    }
  }, [listItemsService, listItemsProduct]);
  return (<FullScreenWrapper>
    <CustomHeader isBack title={"Chi tiết đặt lịch"} />
    <ScrollView showsVerticalScrollIndicator={false}>
      <SContainer>
        <SHeader />
        <View style={{
          gap: 8,
          marginTop: -40,
          width: "100%",
          alignItems: "center",
          paddingBottom: 12,
          borderBottomColor: "#E0E2E7",
          borderBottomWidth: 1
        }}>
          <SAvatarWrapper>
            <SAvatar source={{ uri: data?.customer?.avatar }} />
          </SAvatarWrapper>
          <STextNormal>{data?.customer.fullName}</STextNormal>
        </View>
        <View style={{
          width: "100%",
          paddingHorizontal: 24,
          marginTop: 20,
          gap: 20
        }}>
          <Section>
            <SIcon source={IC_PHONE_ROUNED} />
            <View>
              <STextBold>Số điện thoại</STextBold>
              <STextNormal>{data?.customer.phoneNumber}</STextNormal>
            </View>
          </Section>
          <Section>
            <View style={{
              width: 40,
              height: 40
            }} />
            <View>
              <STextBold>Ngày đến</STextBold>
              <STextNormal>{moment(data?.dateBook).format("h:mm:ss DD-MM-YYYY")}</STextNormal>
            </View>
          </Section>
          <Section>
            <View style={{
              width: "100%",
              gap: 8,
              alignItems: "center"
            }}>
              <STextBold>Mô tả tình trạng xe</STextBold>
              <SDescription>
                <STextNormal>{data?.description}</STextNormal>
              </SDescription>
            </View>
          </Section>
          {listItemsService.length > 0 || listItemsProduct.length > 0 ? <Section>
            <View style={{
              width: "100%",
              gap: 8,
              alignItems: "center"
            }}>
              <STextBold>Chi tiết sửa chữa</STextBold>
              {listItems}
            </View>
          </Section> : null}
        </View>
      </SContainer>
    </ScrollView>
  </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background: white;
  align-items: center;
  padding: 20px 0;
`;
const SAvatarWrapper = styled.View`
  width: 82px;
  height: 82px;
  border-radius: 41px;
  background-color: #E5E5E5;
`;
const SAvatar = styled.Image`
  width: 82px;
  height: 82px;
  border-radius: 41px;
`;
const SHeader = styled.View`
  background-color: #BD3505;
  height: 80px;
  width: 100%;
  border-radius: 4px;
`;
const SIcon = styled.Image`
  width: 40px;
  height: 40px;
`;
const Section = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 12px;
`;
const STextNormal = styled.Text`
  color: #333843;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: 0.08px;
`;
const STextBold = styled(STextNormal)`
  font-weight: 700;
`;
const SDescription = styled.View`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.15);
  min-height: 120px;
  width: 100%;
`;
const STextInputWrapper = styled.View`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #616161;
  min-height: 129px;
`;
const SActionButton = styled.TouchableOpacity`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: black;
  margin: 0 12px 12px 12px;
`;
const STextButton = styled(STextNormal)`
  color: white;
`;
const SImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 8px;
  background-color: gray;
`;
const SName = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;
const SPrice = styled.Text`
  color: #FE3A30;
  font-family: ${Fonts.Regular};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;
const SQuantity = styled.Text`
  color: #231D25;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 500;
`;
const STextDiscount = styled(STextNormal)`
  color: #888;

`;
