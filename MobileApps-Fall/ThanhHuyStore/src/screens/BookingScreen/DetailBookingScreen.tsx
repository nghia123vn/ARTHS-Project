import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { useBooking } from "@/store/booking";
import { useNavigationParams } from "@/hooks";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import moment from "moment";
import { requestOrderById } from "@/store/order/function";
import { formatCurrency } from "@/utils/format";
import { OrderDetail } from "@/store/order/type";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CancelBookingBottomSheet } from "@/screens/BookingScreen/CancelBookingBottomSheet";
import { EBookingStatus } from "@/store/booking/type";
import { navigateToCreateFeedbackScreen } from "@/utils/navigation";
import useAutoToastError from "@/hooks/useAutoToastError";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestBookingByid } from "@/store/booking/function";

export interface DetailBookingScreenParams {
  id: string;
}

export const DetailBookingScreen = memo(function DetailBookingScreen() {
  const { id } = useNavigationParams<DetailBookingScreenParams>();
  const booking = useBooking(id);
  const sheetRef = useRef<BottomSheetModal>(null);
  const [orderDetails, setOrderDetails] = React.useState<OrderDetail[]>([]);
  const requestOrderOfBooking = useCallback(async () => {
    const orderId = booking?.orderId;
    if (orderId) {
      const response = await requestOrderById(orderId);
      if (response) {
        setOrderDetails(response?.orderDetails || []);
      }
    }
  }, []);
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    () => requestBookingByid(id),
    [id]
  );
  useEffect(() => {
    loadFirst().then();
  }, []);
  useAutoToastError(firstError);
  useEffect(() => {
    requestOrderOfBooking().then();
  }, []);
  const isShowCancelBtn = useMemo(() => {
    return booking?.status === EBookingStatus.PENDING && moment(booking?.dateBook).isAfter(moment());
  }, [booking?.status, booking?.dateBook]);
  const isShowFeedbackBtn = useMemo(() => {
    return booking?.status === EBookingStatus.COMPLETED;
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
        <View style={{
          display: "flex",
          gap: 12,
          flexDirection: "column"
        }}>
          <STextBold>Sản phẩm</STextBold>
          {listItemsProduct.map((item, index) => {
            return (
              <FlexSpaceBetween style={{
                borderColor: "#666",
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: 10,
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
        <View style={{
          display: "flex",
          gap: 12,
          flexDirection: "column"
        }}>
          <STextBold>Dịch vụ</STextBold>
          {listItemsService.map((item, index) => {
            return (
              <FlexSpaceBetween style={{
                borderColor: "#666",
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: 10,
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
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Chi tiết dịch vụ"} />
      <ScrollView style={{
        flex: 1
      }}>
        <SContainer>
          <SInfoWrapper>
            <FlexCenter style={{
              alignItems: "flex-start"
            }} gap={8}>
              <View>
                <STextBold>Địa chỉ cửa hàng</STextBold>
                <STextNormal>73/16 Phạm Văn Chiêu
                  Phường 2, Quận Gò Vấp, TP. Hồ Chí Minh</STextNormal>
              </View>
            </FlexCenter>
            <View>
              <STextBold>Giờ làm việc</STextBold>
              <STextNormal>8:00 - 18:00</STextNormal>
            </View>
            <View>
              <STextBold>Thông tin khách hàng</STextBold>
              <STextNormal>{`${booking?.customer.fullName} | ${booking?.customer.phoneNumber}`}</STextNormal>
            </View>
            <View>
              <STextBold>Thời gian đã chọn</STextBold>
              <STextNormal>{moment(booking?.dateBook).format("DD-MM-YYYY")}</STextNormal>
            </View>
            <View>
              <STextBold>Thời gian đặt lịch</STextBold>
              <STextNormal>{moment(booking?.createAt).format("DD-MM-YYYY - hh:mm")}</STextNormal>
            </View>
            {booking?.cancellationReason ? <View style={{
              gap: 8
            }}>
              <STextBold>Lí do hủy</STextBold>
              <STextInputWrapper>
                <STextNormal>{booking?.cancellationReason}</STextNormal>
              </STextInputWrapper>
            </View> : null}
          </SInfoWrapper>
          <View style={{
            gap: 8
          }}>
            <STextBold>Tình trạng xe</STextBold>
            <STextInputWrapper>
              {booking?.description ? <STextNormal>{booking?.description}</STextNormal> :
                <STextNormal>Không có mô tả tình trạng xe</STextNormal>}
            </STextInputWrapper>
          </View>
          <View style={{
            borderTopColor: "#1f1f1f",
            borderTopWidth: 1,
            paddingTop: 12
          }}>
            <STextBold style={{
              textAlign: "center"
            }}>Chi tiết sửa chữa</STextBold>
          </View>
          {booking?.staff ? <View style={{
            gap: 12
          }}>
            <STextBold>Nhân viên</STextBold>
            <SInfoWrapper style={{
              flexDirection: "row"
            }}>
              <SAvatar source={{ uri: booking?.staff.avatar || "" }} />
              <View style={{
                flex: 1
              }}>
                <STextBold numberOfLines={2}>{booking?.staff.fullName}</STextBold>
                <SName>{`SĐT: ${booking?.staff.phoneNumber}`}</SName>
              </View>
            </SInfoWrapper>
          </View> : null}
          {listItems}
          {isShowCancelBtn ? <SActionButton onPress={() => {
            sheetRef.current?.present();
          }}>
            <STextButton>Hủy lịch hẹn</STextButton>
          </SActionButton> : null}
          {isShowFeedbackBtn ? <SActionButton onPress={() => {
            navigateToCreateFeedbackScreen({
              staff: booking?.staff,
              listProductsIds: orderDetails.map(item => item.motobikeProduct?.id || "")
            });
          }} style={{
            backgroundColor: "#BD3505"
          }}>
            <STextButton>Đánh giá</STextButton>
          </SActionButton> : null}
        </SContainer>
      </ScrollView>
      <CancelBookingBottomSheet bookingId={id} ref={sheetRef} />
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  padding: 16px;
  gap: 12px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
const SInfoWrapper = styled.View`
  padding: 12px;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #000;
  background: #FFF;
  box-shadow: 0 -8px 12px rgba(0, 0, 0, 0.03);
`;

const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;
const STextDiscount = styled(STextNormal)`
  color: #888;
  text-decoration: line-through;
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
  font-family: ${Fonts.Bold};
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
const SAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
`;
