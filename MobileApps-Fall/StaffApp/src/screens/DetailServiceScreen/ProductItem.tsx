import React, { memo } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { formatCurrency } from "@/utils/format";
import { Fonts } from "@/theme/Fonts";
import { OrderDetail } from "@/store/order/type";

interface ProductItemProps {
  item: OrderDetail;

}

export const ProductItem = memo(function ProductItem(props: ProductItemProps) {
  const { item } = props;
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
          {item.discount ? <STextDiscount>{formatCurrency(item?.motobikeProduct?.priceCurrent || 0)}</STextDiscount>
            : null}
          <SPrice>{formatCurrency((item?.motobikeProduct?.priceCurrent || 0) * (100 - (item?.motobikeProduct?.discountAmount || 0)) / 100)}</SPrice>
          {item?.discount ? <STextGreen style={{
            textAlign: "left",
            fontSize: 12
          }}>{`${item.discount.title} - (${item.discount.discountAmount}%)`}</STextGreen> : null}
          {item.instUsed ? <STextNormal style={{
            color: "#0063FF"
          }}>Thay thế tại cửa hàng</STextNormal> : null}
        </View>
      </FlexCenter>
      <SQuantity>x{item?.quantity}</SQuantity>
    </FlexSpaceBetween>
  );
});

const STextNormal = styled.Text`
  color: #333843;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: 0.08px;
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
  text-decoration: line-through;

`;
const STextGreen = styled(STextNormal)`
  color: #3FBD4C;
  text-align: center;
`;
