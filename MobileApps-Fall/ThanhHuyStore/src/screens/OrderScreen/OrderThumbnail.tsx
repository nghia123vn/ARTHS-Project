import { memo, useMemo } from "react";
import { useOrder } from "@/store/order";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { View } from "react-native";
import { EOrderStatus } from "@/store/order/type";
import { IC_TRUCK } from "@/assets";
import { navigateToCartScreen, navigateToDetailOrderScreen } from "@/utils/navigation";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { IAddToCartParams, requestAddToCart } from "@/zustand/cart/function";
import { LoadingModal } from "@/components/LoadingModal";
import { requestOrderById } from "@/store/order/function";
import { formatCurrency } from "@/utils/format";
import moment from "moment";
import useAutoToastError from "@/hooks/useAutoToastError";

export const OrderThumbnail = memo(function OrderThumbnail({ id }: { id: string }) {
  const data = useOrder(id);
  const firstItem = useMemo(() => {
    return data?.orderDetails[0];
  }, [data]);

  const [{ loading: rebuyLoading, error: rebuyError }, onReBuy] = useAsyncFn(async () => {
    if (data?.orderDetails) {
      let newCartItems: IAddToCartParams[] = [];
      data?.orderDetails.map((item) => {
        if (item.motobikeProduct) {
          newCartItems.push({
            productId: item.motobikeProduct.id,
            quantity: item.quantity
          });
        }
      });
      await requestAddToCart(newCartItems);
      navigateToCartScreen();
    }
  }, []);
  useAutoToastError(rebuyError)

  const renderFirstItem = useMemo(()=>{
    if(firstItem?.motobikeProduct){
      return (
        <FlexSpaceBetween style={{
          paddingBottom: 12,
          borderBottomColor: "#E5E5E5",
          borderBottomWidth: 1,
          marginBottom: 12
        }}>
          <FlexCenter gap={12} style={{
            alignItems: "flex-start",
            flex: 1
          }}>
            <SImage source={{ uri: firstItem?.motobikeProduct.image || "" }} />
            <View style={{
              gap: 8,
              flex: 1
            }}>
              <STextGrey>{`Ngày đặt: ${moment(firstItem?.createAt).format("DD-MM-YYYY")}`}</STextGrey>
              <SName numberOfLines={2}>{firstItem?.motobikeProduct.name}</SName>
              <SPrice>{formatCurrency(firstItem?.price || 0)}</SPrice>
            </View>
          </FlexCenter>
          <SQuantity>x{firstItem?.quantity}</SQuantity>
        </FlexSpaceBetween>
      )
    }
    if(firstItem?.repairService){
      return (
        <FlexSpaceBetween style={{
          paddingBottom: 12,
          borderBottomColor: "#E5E5E5",
          borderBottomWidth: 1,
          marginBottom: 12
        }}>
          <FlexCenter gap={12} style={{
            alignItems: "flex-start",
            flex: 1
          }}>
            <SImage source={{ uri: firstItem?.repairService.image || "" }} />
            <View style={{
              gap: 8,
              flex: 1
            }}>
              <STextGrey>{`Ngày đặt: ${moment(firstItem?.createAt).format("DD-MM-YYYY")}`}</STextGrey>
              <SName numberOfLines={2}>{firstItem?.repairService.name}</SName>
              <SPrice>{formatCurrency(firstItem?.price || 0)}</SPrice>
            </View>
          </FlexCenter>
          <SQuantity>x{firstItem?.quantity}</SQuantity>
        </FlexSpaceBetween>
      )
    }
    else return null
  },[])


  const InfoSection = useMemo(() => {
    switch (data?.status) {
      case EOrderStatus.PENDING: {
        return <View>
          <FlexSpaceBetween>
            {data?.orderDetails && data?.orderDetails.length > 1 ?
              <STextGrey>{`${data?.orderDetails.length - 1} sản phẩm khác`}</STextGrey> : <View />}
            <FlexCenter gap={8}>
              <STextNormal>Tổng thanh toán:</STextNormal>
              <STotalPrice>{formatCurrency(data?.totalAmount)}</STotalPrice>
            </FlexCenter>
          </FlexSpaceBetween>
        </View>;
      }
      case EOrderStatus.SUCCESS: {
        return <STextGreen>Đơn hàng đang được nhân viên chuẩn bị</STextGreen>;
      }
      case EOrderStatus.PROCESSING: {
        return <FlexCenter gap={8}>
          <SIcon source={IC_TRUCK} />
          <STextGreen>Đơn hàng đang được vận chuyển</STextGreen>
        </FlexCenter>;
      }
      case EOrderStatus.TRANSFER: {
        return <View>
          <FlexCenter gap={8}>
            <SIcon source={IC_TRUCK} />
            <STextGreen>Đơn hàng đã được giao</STextGreen>
          </FlexCenter>
          <FlexSpaceBetween>
            <View />
            <SActionButton onPress={() => {
              navigateToDetailOrderScreen({ id: data?.id || "" });
            }}>
              <STextNormal style={{
                color: "white"
              }}>Đánh giá</STextNormal>
            </SActionButton>
          </FlexSpaceBetween>
        </View>;
      }
      case EOrderStatus.CANCEL: {
        return <FlexSpaceBetween>
          <View />
          <SActionButton onPress={onReBuy}>
            <STextNormal style={{
              color: "white"
            }}>Mua lại</STextNormal>
          </SActionButton>
        </FlexSpaceBetween>;
      }
      default: {
        return <FlexSpaceBetween>
          {data?.orderDetails && data?.orderDetails.length > 1 ?
            <STextGrey>{`${data?.orderDetails.length - 1} sản phẩm khác`}</STextGrey> : <View />}
          <FlexCenter gap={8}>
            <STextNormal>Tổng thanh toán:</STextNormal>
            <STotalPrice>{formatCurrency(data?.totalAmount || 0)}</STotalPrice>
          </FlexCenter>
        </FlexSpaceBetween>;
      }
    }
  }, [data]);
  return (
    <SContainer onPress={() => {
      navigateToDetailOrderScreen({ id: data?.id || "" });
    }}>
      {renderFirstItem}
      {InfoSection}
      <LoadingModal isVisible={rebuyLoading} />
    </SContainer>
  );
});
const SImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 8px;
  background-color: gray;
`;
const SContainer = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-color: #E5E5E5;
  margin-bottom: 16px;
  background-color: white;
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
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const STotalPrice = styled.Text`
  color: #F00;
  font-family: ${Fonts.Regular};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
`;

const STextGrey = styled(STextNormal)`
  color: #818181;
`;
const STextGreen = styled(STextNormal)`
  color: #3FBD4C;
  text-align: center;
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: #3FBD4C;
`;
const SActionButton = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 12px;
  background: #BD3505;
  align-items: center;
  justify-content: center;
`;
