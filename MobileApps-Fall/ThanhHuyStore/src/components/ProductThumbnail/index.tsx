import { memo, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { IC_DISCOUNT_WRAPPER, IC_STAR_FILLED } from "@/assets";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { useProduct } from "@/store/product";
import { navigateToDetailProductScreen } from "@/utils/navigation";
import { formatCurrency } from "@/utils/format";
import { View, StyleSheet, Dimensions } from "react-native";

interface ProductThumbnailProps {
  id: number | string;
}

export const  ProductThumbnail = memo(function ProductThumbnail(props: ProductThumbnailProps) {
  const { id } = props;
  const data = useProduct(id);
  const discountPrice = useMemo(()=>{
    if (data?.priceCurrent && data?.discount) return (100 - data.discount?.discountAmount) * data.priceCurrent / 100;
    return data?.priceCurrent;
  },[data])
  const averageRating = useMemo(() => {
    if (data) {
      return data?.feedbackProducts.reduce((acc, cur) => acc + cur.rate, 0) / data?.feedbackProducts.length || 0;
    }
    else return 0
  }, [data]);
  const onGoToDetail = useCallback(() => {
    navigateToDetailProductScreen({
      id
    });
  }, [id]);
  return (
    <SContainer onPress={onGoToDetail}>
      {data?.discount && data.discount.discountAmount > 0 ? <SImageWrapper source={IC_DISCOUNT_WRAPPER}>
        <STextNormal style={{
          color:'white',
          fontWeight:'bold'
        }}>{`-${data.discount.discountAmount}%`}</STextNormal>
      </SImageWrapper> :null}
      <SImageThumbnail source={{ uri: data?.images[0].imageUrl }} resizeMode={"center"} />
      <View style={{
        gap:10,
        justifyContent:'space-between',
        flex:1
      }}>
        <View>
          <STitle>{data?.name}</STitle>
          {
            // @ts-ignore
            data?.discount?.discountAmount > 0 ? <SDiscount>{formatCurrency(data?.priceCurrent || 0)}</SDiscount>
              : null}
          <SPrice>{`${formatCurrency(discountPrice || 0)}`}</SPrice>
        </View>
        <FlexCenter gap={4}>
          <SImage source={IC_STAR_FILLED} />
          <STextNormal>{averageRating.toFixed(2)}</STextNormal>
          <STextNormal>{`    ${data?.feedbackProducts.length} Đánh giá`}</STextNormal>
        </FlexCenter>
      </View>
    </SContainer>
  );
});
const DWidth = Dimensions.get("window").width;
const SContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  border-radius: 10px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: white;
  border: 1px solid #C0C0C0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 10px;
  letter-spacing: 0.2px;
`;
const SImage = styled.Image`
  width: 12px;
  height: 12px;
  tint-color: #FFC120;
`;
const SImageThumbnail = styled.Image`
  width: 100%;
  height: 120px;
`;
const SImageWrapper =  styled.ImageBackground`
position: absolute;
  top:0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
  padding:0 4px;
  height: 40px;
`
