import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { IC_CHECKED, IC_DISCOUNT_WRAPPER, IC_MINUS, IC_PLUS, IC_REMOVE } from "@/assets";
import FastImage from "react-native-fast-image";
import { CartItem } from "@/zustand/cart/type";
import { formatCurrency } from "@/utils/format";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { View } from "react-native";

interface CartItemProps {
  item: CartItem;
  onModify: (productId: string, type: ("add" | "minus")) => void;
  checked: boolean;
  onDelete: (productId: string) => void;
  onToggleCheck: (productId: string) => void;

}

export const CartItemThumbnail = memo(function CartItem(props: CartItemProps) {
  const { item, onModify, checked, onDelete, onToggleCheck } = props;
  const dataProduct = item?.motobikeProduct;
  const priceDiscount = useMemo(() => {
    if (!dataProduct) return 0;
    return dataProduct?.priceCurrent * (100 - dataProduct?.discountAmount) / 100;
  }, []);


  const onAddQuantity = useCallback((type: ("add" | "minus")) => {
    onModify(item.motobikeProduct.id, type);
  }, []);

  const renderRightActions = useCallback(() => {
    return (
      <SDeleteButton style={{
        backgroundColor: "rgba(255, 63, 63, 0.38)",
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }} onPress={() => {
        onDelete(item.motobikeProduct.id);
      }}>
        <SImage source={IC_REMOVE} />
      </SDeleteButton>
    );
  }, []);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <SContainer>
        <CheckBoxWrapper onPress={() => {
          onToggleCheck(item.motobikeProduct.id);
        }}>
          {checked ? <SImageChecked source={IC_CHECKED} /> : <View />}
        </CheckBoxWrapper>
        <View>
          {dataProduct.discountAmount > 0 ? <SImageWrapper source={IC_DISCOUNT_WRAPPER}>
            <STextBold style={{
              color: "white",
              fontWeight: "bold"
            }}>{`-${dataProduct.discountAmount}%`}</STextBold>
          </SImageWrapper> : null}
          <SImageThumbnail source={{ uri: dataProduct?.image }} />
        </View>
        <View style={{
          gap: 8,
          alignItems: "flex-start",
          flex: 1
        }}>
          <STextBold numberOfLines={1}>{dataProduct?.name}</STextBold>
          <STextDiscount>{formatCurrency(dataProduct?.priceCurrent)}</STextDiscount>
          <STextPrice>{formatCurrency(priceDiscount)}</STextPrice>
          <FlexCenter>
            <SBtnCenter onPress={() => {
              onAddQuantity("minus");
            }}>
              <SAddImage source={IC_MINUS} />
            </SBtnCenter>
            <STextBold>{item?.quantity}</STextBold>
            <SBtnCenter onPress={() => {
              onAddQuantity("add");
            }}>
              <SAddImage source={IC_PLUS} />
            </SBtnCenter>
          </FlexCenter>
        </View>
      </SContainer>
    </Swipeable>

  );
});
const SContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  padding: 12px;
  gap: 12px;
`;

const CheckBoxWrapper = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid rgba(196, 197, 196, 1);
`;
const SImageChecked = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 8px;
`;
const SImage = styled.Image`
  width: 16px;
  height: 16px;
  tint-color: #FF0000;
`;
const SAddImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;
const SImageThumbnail = styled(FastImage)`
  width: 100px;
  height: 100px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;
const STextDiscount = styled.Text`
  color: #888;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-decoration-line: line-through;
`;
const STextPrice = styled.Text`
  color: #FE3A30;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;
const FlexCenter = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 2px;
`;
const SBtnCenter = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
const SDeleteButton = styled(RectButton)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const SImageWrapper = styled.ImageBackground`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 40px;
`;
