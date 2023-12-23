import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { CustomHeaderTab } from "@/components/CustomHeaderTab";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { SearchBar } from "@/components/SearchBar";
import { Button, FlatList, RefreshControl, View } from "react-native";
import { FlexBox } from "@/helper/styles";
import { ItemCategory, ItemCategoryHome } from "@/components/ItemCategory";
import { Fonts } from "@/theme/Fonts";
import { useProductByQuery } from "@/store/product";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { EmptyView } from "@/components/EmptyView";
import { useCategoryByQuery } from "@/store/category";
import { requestBestSellerProducts, requestListProducts, requestLoadMoreProducts } from "@/store/product/function";
import { requestAllCategories } from "@/store/category/function";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { requestAccountDetail } from "@/zustand/account/function";
import { requestCurrentCart } from "@/zustand/cart/function";
import { requestAllDiscounts } from "@/store/discount/function";
import { DiscountCarousel } from "@/screens/HomeScreen/DiscountCarousel";
import { requestConfiguration } from "@/zustand/configuration/function";
import { navigateToCalendarScreen } from "@/utils/navigation";
import { BestSeller } from "@/screens/HomeScreen/BestSeller";


export const HomeScreen = memo(function HomeScreen() {
  const listProducts = useProductByQuery("active");
  const listCategories = useCategoryByQuery("all");
  const [pageNumber, setPageNumber] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setPageNumber(0)
      syncData().then();
      setRefreshing(false);
    }, 2000);
  }, []);
  const syncData = async () => {
    await requestListProducts();
    await requestAllCategories({
      name: ""
    });
    await requestAccountDetail();
    await requestCurrentCart();
    await requestAllDiscounts();
    await requestConfiguration();
    await requestBestSellerProducts()
  };
  const handleLoadMore = useCallback(async ()=>{
    setPageNumber(pageNumber + 1)
    await requestLoadMoreProducts(pageNumber + 1)
  },[pageNumber])

  useEffect(() => {
    syncData().then();
  }, []);


  return (
    <FullScreenWrapper>
      <CustomHeaderTab />
      <SContainer>
        <FlatList data={[...listProducts]} numColumns={2}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  columnWrapperStyle={{
                    gap: 12
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 12
                  }}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  ListHeaderComponent={
                    <View style={{
                      gap: 20
                    }}>
                      <SearchBar />
                      <DiscountCarousel/>
                      <FlexBox style={{
                        backgroundColor:'white',
                        borderTopColor:'#E5E5E5',
                        borderTopWidth:1,
                        paddingTop:12,
                        paddingBottom:20
                      }}>
                        {[...listCategories, "service"].map((item) => <ItemCategoryHome key={item} id={item} />)}
                      </FlexBox>
                      <BestSeller/>
                      <STextNormal>Danh sách sản phẩm</STextNormal>
                    </View>}
                  renderItem={({ item }) => <ProductThumbnail id={item} />}
                  ListEmptyComponent={<EmptyView title="Không tìm thấy sản phẩm nào" />}
        />
        <AnimatedBottomSpace/>
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #FAFAFA;
  gap: 20px;
  padding: 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;

