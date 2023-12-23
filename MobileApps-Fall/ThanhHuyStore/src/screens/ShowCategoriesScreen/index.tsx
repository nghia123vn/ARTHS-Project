import { ECategory } from "@/store/category/type";


import React, { memo, useEffect } from "react";
import styled from "styled-components/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { FlatList, View } from "react-native";
import { Fonts } from "@/theme/Fonts";
import { useProductByQuery } from "@/store/product";
import { EmptyView } from "@/components/EmptyView";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { CustomHeader } from "@/components/CustomHeader";
import { requestListService } from "@/store/service/function";
import { useNavigationParams } from "@/hooks";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { requestListProductsByCategory } from "@/store/product/function";

export interface CategoriesScreenParams {
  category: ECategory;
}

export const ShowCategoriesScreen = memo(function ShowCategoriesScreen() {
  const { category } = useNavigationParams<CategoriesScreenParams>();

  const listProducts = useProductByQuery(category);

  const syncData = async () => {
    await requestListService();
  };
  useEffect(() => {
    requestListProductsByCategory(category).then();
  }, [category]);

  useEffect(() => {
    syncData().then();
  }, []);

  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={category.toUpperCase()} />
      <SContainer>
        <FlatList data={[...listProducts]} numColumns={2}
                  columnWrapperStyle={{
                    gap: 12
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 12
                  }}
                  ListHeaderComponent={
                    <View style={{
                      gap: 20
                    }}>
                      <STextNormal>{`Phân loại:  ${category.toUpperCase()}`}</STextNormal>
                    </View>}
                  renderItem={({ item }) => <ProductThumbnail id={item} />}
                  ListEmptyComponent={<EmptyView title="Không tìm thấy dịch vụ nào" />}
        />
        <AnimatedBottomSpace />
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 20px;
  padding: 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;

