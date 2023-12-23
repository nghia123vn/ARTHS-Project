import React, { memo, useEffect, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { useNavigationParams } from "@/hooks";
import { Fonts } from "@/theme/Fonts";
import { Dimensions, FlatList, View } from "react-native";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { useCart } from "@/zustand/cart";
import { useDiscount } from "@/store/discount";
import { requestDiscountById } from "@/store/discount/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import useAutoToastError from "@/hooks/useAutoToastError";
import { DiscountMotobikeProduct, DiscountRepairService } from "@/store/discount/type";
import { MiniItemProduct } from "@/screens/DetailDiscountScreen/MiniItemProduct";
import { MiniItemService } from "@/screens/DetailDiscountScreen/MiniItemService";
import RenderHtml from "react-native-render-html";


export interface DetailDiscountScreenParams {
  id: number | string;
}

const { width: DWidth } = Dimensions.get("screen");

export const DetailDiscountScreen = memo(function DetailDiscountScreen() {
  const { id } = useNavigationParams<DetailDiscountScreenParams>();
  const [motobikeProducts, setMotobikeProducts] = useState<DiscountMotobikeProduct[]>([]);
  const [repairServices, setRepairServices] = useState<DiscountRepairService[]>([]);
  const data = useDiscount(id);
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(async () => {
    const response = await requestDiscountById(id);
    if (response && response.motobikeProducts) {
      setMotobikeProducts(response.motobikeProducts);
    }
    if (response && response.repairService) {
      setRepairServices(response.repairService);
    }
  }, []);
  useEffect(() => {
    loadFirst().then();
  }, [id]);
  useAutoToastError(firstError);
console.log(motobikeProducts)
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Chi tiết khuyến mãi"} />
      <SContainer>
        <SImageWrapper>
          <SImageThumbnail source={{ uri: data?.imageUrl || "" }} resizeMode={"cover"} />
        </SImageWrapper>
        <SInfoWrapper>
          <STitle>{data?.title}</STitle>
          <Description>Mô tả</Description>
          <RenderHtml source={{ html: data?.description || "" }}/>
        </SInfoWrapper>
        <View style={{
          marginBottom: 40
        }}>
          <STextBold>Sản phẩm:</STextBold>
          <FlatList data={motobikeProducts} contentContainerStyle={{
            gap:12
          }} renderItem={
            ({ item }) => <MiniItemProduct product={item} />
          } horizontal={true} />
          <STextBold>Dịch vụ:</STextBold>
          <FlatList data={repairServices} contentContainerStyle={{
            gap:12
          }} renderItem={
            ({ item }) => <MiniItemService service={item} />
          } horizontal={true} />
        </View>
      </SContainer>
      <AnimatedBottomSpace />

    </FullScreenWrapper>
  );
});
const SContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
const SImageWrapper = styled.View`
  padding: 12px;
  align-items: center;
  border-radius: 10px;
  background-color: #FAFAFA;
`;
const SImageThumbnail = styled.Image`
  width: 100%;
  height: 200px;
`;
const Description = styled.Text`
  color: #0C1A30;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: 0.2px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.2px;
`;
const SInfoWrapper = styled.View`
  gap: 8px;
  border-bottom-width: 1px;
  padding: 12px 0;
  border-bottom-color: #E5E5E5;
`;

const STitle = styled(STextNormal)`
  font-size: 24px;
  font-family: ${Fonts.Bold};
  line-height: 32px; /* 133.333% */
  font-weight: 700;
`;

const STextBold = styled(STextNormal)`
font-weight: 700;
`
