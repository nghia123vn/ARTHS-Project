import { memo, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { IC_DISCOUNT_WRAPPER, IC_STAR_FILLED } from "@/assets";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { useProduct } from "@/store/product";
import { navigateToDetailProductScreen } from "@/utils/navigation";
import { formatCurrency } from "@/utils/format";
import { Dimensions, View } from "react-native";

interface BestSellerThumbnailProps {
  id: number | string;
}

export const BestSellerThumbnail = memo(function BestSellerThumbnail(props: BestSellerThumbnailProps) {
  const { id } = props;
  const data = useProduct(id);
  const discountPrice = useMemo(() => {
    if (data?.priceCurrent && data?.discount) return (100 - data.discount?.discountAmount) * data.priceCurrent / 100;
    return data?.priceCurrent;
  }, [data]);
  const averageRating = useMemo(() => {
    if (data) {
      return data?.feedbackProducts.reduce((acc, cur) => acc + cur.rate, 0) / data?.feedbackProducts.length || 0;
    } else return 0;
  }, [data]);
  const onGoToDetail = useCallback(() => {
    navigateToDetailProductScreen({
      id
    });
  }, [id]);
  return (
    <SContainer onPress={onGoToDetail}>
      <SImageThumbnail source={{ uri: data?.images[0].imageUrl }} resizeMode={"center"} />
      <View style={{
        gap: 10,
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        flex: 1
      }}>
        <View>
          <STitle>{data?.name}</STitle>
          {
            // @ts-ignore
            data?.discount?.discountAmount > 0 ? <SDiscount>{formatCurrency(data?.priceCurrent || 0)}</SDiscount>
              : <View />}
          <SPrice>{`${formatCurrency(discountPrice || 0)}`}</SPrice>
        </View>
        <View>
          <FlexCenter gap={4}>
            <SImage source={IC_STAR_FILLED} />
            <STextNormal>{averageRating.toFixed(2)}</STextNormal>
            <STextNormal>{`    ${data?.feedbackProducts.length} Đánh giá`}</STextNormal>
          </FlexCenter>
          {data?.totalQuantitySold ? <STextSold>{`Đã bán ${data?.totalQuantitySold}`}</STextSold>
            : null}
        </View>
      </View>
      {data?.discount && data.discount.discountAmount > 0 ? <SImageWrapper source={IC_DISCOUNT_WRAPPER}>
        <STextNormal style={{
          color: "white",
          fontWeight: "bold"
        }}>{`-${data.discount.discountAmount}%`}</STextNormal>
      </SImageWrapper> : <SEmptyImage />}
    </SContainer>
  );
});
const DWidth = Dimensions.get("window").width;
const SContainer = styled.TouchableOpacity`
  display: flex;
  position: relative;
  border-radius: 10px;
  justify-content: space-between;
  padding: 15px 10px;
  align-items: flex-start;
  gap: 20px;
  background-color: white;
  border: 1px solid #C0C0C0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: ${DWidth / 2 - 20}px;

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
const SImageWrapper = styled.ImageBackground`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  height: 40px;
`;
const SEmptyImage = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  height: 40px;
`;
const SBoxSold = styled.View`
  background-color: #dccaca;
  width: 100%;
  height: 24px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
const SSoldProgress = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #de5f59;
  border-radius: 4px;
`;
const STextSold = styled.Text`
  color: #1f1f1f;
  font-family: ${Fonts.Bold};
  font-size: 10px;
  letter-spacing: 0.2px;
  padding: 2px 4px;
`;
