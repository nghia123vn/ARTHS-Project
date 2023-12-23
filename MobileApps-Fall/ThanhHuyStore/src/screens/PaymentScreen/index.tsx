import React, { memo, useMemo, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { IC_BILL, IC_DOLLAR, IC_LOCATION } from "@/assets";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { useProduct } from "@/store/product";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { CartItem } from "@/zustand/cart/type";
import { requestCreateOnlineOrder, requestCreateVnPay } from "@/store/order/function";
import {
  navigateToChangeAddressScreen,
  navigateToDetailOrderScreen,
  navigateToPaymentStatus,
  navigateToVnPayScreen
} from "@/utils/navigation";
import SimpleToast from "react-native-simple-toast";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { EPaymentMethod, formatCurrency } from "@/utils/format";
import { useNavigationParams } from "@/hooks";
import { useAccount } from "@/zustand/account";
import { PaymentBottomSheet } from "@/screens/PaymentScreen/PaymentBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useAutoToastError from "@/hooks/useAutoToastError";
import { useConfiguration } from "@/zustand/configuration";
import { getAddress, useAddressByQuery } from "@/store/address";


const Item = memo(function Item({ item }: { item: CartItem }) {
  const data = useProduct(item.motobikeProduct.id);
  const discountPrice = useMemo(() => {
    if (data?.priceCurrent && data?.discount) return (100 - data.discount.discountAmount) * data.priceCurrent / 100;
    return data?.priceCurrent;
  }, [data]);
  return (
    <SWrapperBox>
      <SImageThumbnail source={{ uri: data?.images[0].imageUrl }} />
      <View style={{
        flex: 1
      }}>
        <STitle numberOfLines={1}>{data?.name}</STitle>
        <SDiscount>{`${formatCurrency(data?.priceCurrent || 0)}`}</SDiscount>
        <FlexSpaceBetween>
          <SPrice>{`${formatCurrency(discountPrice || 0)}`}</SPrice>
          <STextNormal>{`x${item.quantity}`}</STextNormal>
        </FlexSpaceBetween>
      </View>
    </SWrapperBox>
  );
});

export interface PaymentScreenParams {
  cartItems: CartItem[];
  cartId: string;
}

export const PaymentScreen = memo(function PaymentScreen() {
  const {cartItems, cartId } = useNavigationParams<PaymentScreenParams>();
  const addressIds = useAddressByQuery('all')
  const configuration = useConfiguration();
  const [paymentMethod,setPaymentMethod] = useState(EPaymentMethod.VNPAY)
  const account = useAccount();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const selectedAddress = useMemo(() => {
    return getAddress(addressIds[selectedIndex])
  }, [selectedIndex]);

  const [{ loading,error }, onProceed] = useAsyncFn(async () => {
    let sandboxLink = "";
    const response = await requestCreateOnlineOrder({
      customerPhoneNumber: selectedAddress?.phoneNumber || account.phoneNumber,
      address: selectedAddress?.address || '',
      paymentMethod: paymentMethod,
      orderDetailModels: cartItems.map(item => ({
        motobikeProductId: item.motobikeProduct.id,
        productQuantity: item.quantity
      }))
    });
    if(paymentMethod === EPaymentMethod.VNPAY){
      if (response) {
        const _response = await requestCreateVnPay({
          orderId: response.id,
          amount: response.totalAmount
        });
        sandboxLink = _response || "";
      }
      if (sandboxLink || "") {
        navigateToVnPayScreen({
          url: sandboxLink
        });
      } else SimpleToast.show("Thanh toán thất bại, vui lòng thử lại");
    }
    else {
      if(response){
        SimpleToast.show("Đặt hàng thành công");
        navigateToPaymentStatus({status:'success'})
      }
    }
  }, [paymentMethod,selectedAddress]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity * (item.motobikeProduct.priceCurrent *(100-item.motobikeProduct.discountAmount)/100), 0)
  }, [cartItems]);

  const shippingMoney = useMemo(()=>{
    if(totalPrice < 1000000)
    return configuration.shippingMoney
    else return  0
  },[totalPrice]);

  useAutoToastError(error);

  return (
    <FullScreenWrapper isGrey>
      <CustomHeader isBack title="Thanh toán" />
      <SWrapperBox style={{
        alignItems: "center",
      }}>
        <FlexSpaceBetween>
          <FlexCenter gap={8} style={{
            alignItems:'flex-start',
            maxWidth: "70%"
          }}>
            <SIcon source={IC_LOCATION} />
            <View>
              <STextBold>Địa chỉ nhận hàng</STextBold>
              <STextNormal>{`Tên: ${selectedAddress?.name} | ${selectedAddress?.phoneNumber}`}</STextNormal>
              <STextNormal>{selectedAddress?.address}</STextNormal>
            </View>
          </FlexCenter>
          <TouchableOpacity  onPress={()=>{
            navigateToChangeAddressScreen({
              selectedIndex,
              setSelectedIndex
            });
          }}>
            <STextNormal style={{
              color:'#F00'
            }}>Thay đổi</STextNormal>
          </TouchableOpacity>
        </FlexSpaceBetween>
      </SWrapperBox>
      <ScrollView style={{
        flex:1
      }}>
        {cartItems.map((item, index) => <Item key={index} item={item} />)}
        <TouchableOpacity onPress={()=>{
          bottomSheetRef.current?.present();
        }}>
          <SWrapperBox>
            <FlexCenter gap={8}>
              <SIcon source={IC_DOLLAR} />
              <STextNormal>Phương thức thanh toán</STextNormal>
            </FlexCenter>
            <STextNormal>{paymentMethod}</STextNormal>
          </SWrapperBox>
        </TouchableOpacity>
        <SWrapperBox style={{
          flexDirection: "column",
          width: "100%",
        }}>
          <FlexCenter gap={8}>
            <SIcon source={IC_BILL} />
            <STextNormal>Chi tiết thanh toán</STextNormal>
          </FlexCenter>
          <FlexSpaceBetween>
            <STextNormal>Tổng tiền hàng</STextNormal>
            <STextNormal>{`${formatCurrency(totalPrice)}`}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Tổng số lượng</STextNormal>
            <STextNormal>{`${cartItems.reduce((acc, item) => acc + item.quantity, 0)}`}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Tổng phí ship</STextNormal>
            <STextNormal>{formatCurrency(shippingMoney)}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Tổng thanh toán</STextNormal>
            <STextNormal>{`${formatCurrency(totalPrice + shippingMoney)}`}</STextNormal>
          </FlexSpaceBetween>
        </SWrapperBox>
        <StyledBottomView>
          <BuyNowButton onPress={onProceed}>
            {loading ? <ActivityIndicator /> : <STextButton>{`Tiến hành`}</STextButton>}
          </BuyNowButton>
        </StyledBottomView>
      </ScrollView>
      <PaymentBottomSheet paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} ref={bottomSheetRef}/>
    </FullScreenWrapper>
  );
});
const STextBold = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;

const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const SWrapperBox = styled.View`
  align-items: flex-start;
  flex-direction: row;
  background-color: white;
  padding: 16px;
  gap: 12px;
  margin-bottom: 8px;
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const FlexStart = styled.View`

`;
const SImageThumbnail = styled.Image`
  width: 75px;
  height: 75px;
`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 14px;
  letter-spacing: 0.2px;
`;
const SDiscount = styled.Text`
  color: #888;
  font-family: ${Fonts.Bold};
  font-size: 10px;
  letter-spacing: 0.2px;
  text-decoration-line: line-through;
`;
const SPrice = styled.Text`
  color: #FE3A30;
  font-family: ${Fonts.Bold};
  font-size: 12px;
  letter-spacing: 0.2px;
`;
const StyledBottomView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: #FFF;
`;
const BuyNowButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  padding: 12px 16px;
  width: 100%;
  margin:0 20px;
`;
const STextButton = styled.Text`
  color: #FFF;
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.41px;
`;
