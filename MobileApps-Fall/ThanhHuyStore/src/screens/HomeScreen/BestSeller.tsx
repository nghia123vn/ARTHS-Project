import React, { memo, useEffect } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlatList } from "react-native";
import { useProductByQuery } from "@/store/product";
import { requestBestSellerProducts } from "@/store/product/function";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { EmptyView } from "@/components/EmptyView";
import { BestSellerThumbnail } from "@/components/BestSellerThumbnail";

export const BestSeller = memo(function BestSeller() {
  const listIds = useProductByQuery("best-sellers");

  return (
    <SContainer>
      <STextNormal>Top 10 sản phẩm bán chạy</STextNormal>
      <FlatList
        horizontal
        contentContainerStyle={{
          gap: 12
        }}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        data={listIds}
        extraData={listIds}
        renderItem={({ item }) => <BestSellerThumbnail id={item} />}
        onEndReachedThreshold={1}
        ListEmptyComponent={<EmptyView title="Không tìm thấy sản phẩm nào" />}
        nestedScrollEnabled={true}
        // estimatedItemSize={600}
        removeClippedSubviews={true}
      />
    </SContainer>
  );
});
const SContainer = styled.View`
  padding-bottom: 12px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
  margin-bottom: 8px;
`;
