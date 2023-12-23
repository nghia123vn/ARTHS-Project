import React, { memo, useMemo, useRef } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { getDiscount, useDiscountByQuery } from "@/store/discount";
import styled from "styled-components/native";
import { navigateToDiscountDetailScreen } from "@/utils/navigation";


const PAGE_WIDTH = Dimensions.get("window").width;

export const DiscountCarousel = memo(function DiscountCarousel() {
  const listDiscounts = useDiscountByQuery("active");
  const ref = useRef<ICarouselInstance>(null);
  const listImagesDiscounts = useMemo(()=>{
    return listDiscounts.map(discount => {
      const _data = getDiscount(discount)
      return _data?.imageUrl
    })
  },[listDiscounts])
  const baseOptions =
    ({
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH / 2
    } as const);
  return (
    <Carousel
      {...baseOptions}
      loop
      ref={ref}
      testID={"xxx"}
      style={{ width: "100%" }}
      data={listImagesDiscounts || []}
      pagingEnabled
      renderItem={({ index,item }) => <SImageWrapper key={index} onPress={()=>{
        navigateToDiscountDetailScreen({id: listDiscounts[index]})
      }}>
        <SImageThumbnail source={{ uri: item }} resizeMode={"cover"} />
      </SImageWrapper>}
    />
  )
})
const SImageWrapper = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
  border-radius: 10px;
  background-color: #FAFAFA;

`;
const SImageThumbnail = styled.Image`
  width: 100%;
  height: 200px;
`;
