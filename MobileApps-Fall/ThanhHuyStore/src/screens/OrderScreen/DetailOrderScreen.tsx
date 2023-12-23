import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { useOrder } from "@/store/order";
import { useNavigationParams } from "@/hooks";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { IC_DOLLAR, IC_LOCATION, IC_STAR_FILLED, IC_TRUCK } from "@/assets";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import moment from "moment";
import { EOrderStatus } from "@/store/order/type";
import { CancelOrderBottomSheet } from "@/screens/OrderScreen/CancelBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestCreateVnPay, requestOrderById, requestSendFeedback } from "@/store/order/function";
import { navigateToCreateFeedbackScreen, navigateToVnPayScreen } from "@/utils/navigation";
import SimpleToast from "react-native-simple-toast";
import { LoadingModal } from "@/components/LoadingModal";
import { EPaymentMethod, formatCurrency } from "@/utils/format";
import useAutoToastError from "@/hooks/useAutoToastError";

export interface DetailOrderScreenParams {
  id: string;
}

export const DetailOrderScreen = memo(function DetailOrderScreen() {
  const { id } = useNavigationParams<DetailOrderScreenParams>();
  const data = useOrder(id);
  const sheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    () => requestOrderById(id),
    [id]
  );
  useAutoToastError(firstError);

  useEffect(() => {
    loadFirst().then();
  }, []);

  const [{ loading, error }, onRePay] = useAsyncFn(async () => {
    if (data) {
      const sandboxLink = await requestCreateVnPay({
        orderId: data.id,
        amount: data.totalAmount
      });
      if (sandboxLink) {
        navigateToVnPayScreen({
          url: sandboxLink
        });
      } else SimpleToast.show("Thanh toán thất bại, vui lòng thử lại");
    }

  }, [data]);
  useAutoToastError(error);

  const listProductIds = useMemo(()=>{
    let _listProductIds:string[] =[]
     data?.orderDetails.map((item)=>{
      if(item.motobikeProduct) _listProductIds.push(item.motobikeProduct.id)
    })
    return _listProductIds
  },[data])


  const listItems = useMemo(() => {
    return (
      data?.orderDetails.map((item, index) => {
        if (item.motobikeProduct) {
          return (
            <FlexSpaceBetween style={{
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
              backgroundColor: "white",
              padding: 12,
              marginBottom: 12
            }}>
              <FlexCenter gap={12} style={{
                alignItems: "flex-start",
                flex: 1
              }}>
                <SImage source={{ uri: item?.motobikeProduct.image || "" }} />
                <View style={{
                  gap: 8,
                  flex: 1
                }}>
                  <SName numberOfLines={2}>{item?.motobikeProduct.name}</SName>
                  {item.discount ?                   <SDiscount>{formatCurrency(item?.motobikeProduct.priceCurrent)}</SDiscount>
                   : null}
                  <SPrice>{formatCurrency(item?.price)}</SPrice>
                  {item?.discount ? <STextGreen style={{
                    textAlign:'left',
                    fontSize:12,
                  }}>{`${item.discount.title} - (${item.discount.discountAmount}%)`}</STextGreen>:null}
                </View>
              </FlexCenter>
              <SQuantity>x{item?.quantity}</SQuantity>
            </FlexSpaceBetween>
          );
        }
        if (item.repairService) {
          return (
            <FlexSpaceBetween style={{
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
              backgroundColor: "white",
              padding: 12,
              marginBottom: 12
            }}>
              <FlexCenter gap={12} style={{
                alignItems: "flex-start",
                flex: 1
              }}>
                <SImage source={{ uri: item?.repairService.image || "" }} />
                <View style={{
                  gap: 8,
                  flex: 1
                }}>
                  <SName numberOfLines={2}>{item?.repairService.name}</SName>
                  <SPrice>{formatCurrency(item?.price)}</SPrice>
                  {item?.discount ? <STextGreen style={{
                    textAlign:'left',
                    fontSize:12,
                  }}>{`${item.discount.title} - (${item.discount.discountAmount}%)`}</STextGreen>:null}
                </View>
              </FlexCenter>
              <SQuantity>x{item?.quantity}</SQuantity>
            </FlexSpaceBetween>
          );
        } else return null;
      })
    );
  }, []);
  const footer = useMemo(() => {
    switch (data?.status) {
      case EOrderStatus.PENDING: {
        return <View>
          {
            data?.paymentMethod === EPaymentMethod.VNPAY ? <SActionButton onPress={onRePay}>
              <STextNormal style={{
                color: "white"
              }}>Thanh toán lại</STextNormal>
            </SActionButton> : null
          }
          <SActionButton style={{
            marginTop: 12
          }} onPress={() => {
            sheetRef.current?.present();
          }}>
            <STextNormal style={{
              color: "white"
            }}>Huỷ đơn hàng</STextNormal>
          </SActionButton>
        </View>;
      }
      case EOrderStatus.SUCCESS: {
        return <SInfoWrapper>
          <STextGreen>Đơn hàng đang được nhân viên giao đến</STextGreen>
        </SInfoWrapper>;
      }
      case EOrderStatus.PROCESSING: {
        return <SInfoWrapper>
          <FlexCenter gap={8}>
            <SIcon source={IC_TRUCK} style={{
              tintColor: "#3FBD4C"
            }} />
            <STextGreen>Đơn hàng đang được vận chuyển</STextGreen>
          </FlexCenter>
        </SInfoWrapper>;
      }
      case EOrderStatus.TRANSFER: {
        return <View style={{
          paddingHorizontal: 12,
          gap: 20
        }}>
          <SActionButton onPress={()=>{
            navigateToCreateFeedbackScreen({
              staff:data?.staff,
              listProductsIds:listProductIds,
            })
          }}>
            <STextNormal style={{
              color: "white"
            }}>Gửi đánh giá</STextNormal>
          </SActionButton>
        </View>;
      }
      default: {
        return <View />;
      }
    }
  }, [data, rating, content]);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Thông tin đơn hàng"} />
      <KeyboardAvoidingView style={{
        flex: 1
      }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SInfoWrapper>
              <FlexCenter style={{
                alignItems: "flex-start"
              }} gap={8}>
                <SIcon source={IC_LOCATION} />
                <View style={{
                  maxWidth: "80%"
                }}>
                  <STextBold>Địa chỉ nhận hàng</STextBold>
                  <STextNormal>{`Tên: ${data?.customerName} | ${data?.customerPhoneNumber}`}</STextNormal>
                  <STextNormal>{data?.address}</STextNormal>
                </View>
              </FlexCenter>
            </SInfoWrapper>
            {listItems}
            <SInfoWrapper>
              <FlexSpaceBetween>
                <FlexCenter gap={8}>
                  <SIcon source={IC_DOLLAR} />
                  <STextNormal>Phương thức thanh toán</STextNormal>
                </FlexCenter>
                <STextNormal>{data?.paymentMethod}</STextNormal>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <STextNormal>Mã đơn hàng</STextNormal>
                <STextNormal>{data?.id}</STextNormal>
              </FlexSpaceBetween>
              {data?.shippingCode ?  <FlexSpaceBetween>
                <STextNormal>Mã vận đơn</STextNormal>
                <STextNormal>{data?.shippingCode}</STextNormal>
              </FlexSpaceBetween> : null}
              <FlexSpaceBetween>
                <STextNormal>Thời gian đặt hàng</STextNormal>
                <STextNormal>{moment(data?.orderDate).format("DD-MM-YYYY")}</STextNormal>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <STextNormal>Phí ship</STextNormal>
                <STextNormal>{formatCurrency(data?.shippingMoney)}</STextNormal>
              </FlexSpaceBetween>
              <FlexSpaceBetween>
                <STextNormal>Tổng thanh toán</STextNormal>
                <SPrice>{formatCurrency(data?.totalAmount || 0)}</SPrice>
              </FlexSpaceBetween>
            </SInfoWrapper>
            <View style={{
              marginTop: 12
            }}>
              {footer}
            </View>
          </ScrollView>
        </SContainer>
      </KeyboardAvoidingView>
      <CancelOrderBottomSheet ref={sheetRef} orderId={id} />
      <LoadingModal isVisible={loading} />
    </FullScreenWrapper>
  );
});
const SContainer = styled.ScrollView`
  flex: 1;
  background-color: #E8E8E8;
  gap: 20px;
  margin-top: 12px;
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
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
const SInfoWrapper = styled.View`
  padding: 12px;
  gap: 20px;
  background-color: white;
  box-shadow: 0 -8px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 12px;
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
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
const SDiscount = styled.Text`
  color: gray;
  font-family: ${Fonts.Regular};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-decoration: line-through;
`
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
const SActionButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  padding: 12px 0;
  margin: 0 12px;
  align-items: center;
  justify-content: center;
`;
const STextGreen = styled(STextNormal)`
  color: #3FBD4C;
  text-align: center;
`;
