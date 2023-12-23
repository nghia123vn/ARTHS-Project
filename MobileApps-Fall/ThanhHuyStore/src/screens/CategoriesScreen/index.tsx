import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { SearchBar } from "@/components/SearchBar";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { ItemCategory } from "@/components/ItemCategory";
import { Fonts } from "@/theme/Fonts";
import { useProductByQuery } from "@/store/product";
import { useCategoryByQuery } from "@/store/category";
import { CustomHeader } from "@/components/CustomHeader";
import { ECategory } from "@/store/category/type";
import { EmptyView } from "@/components/EmptyView";
import { MiniProductThumbnail } from "@/screens/CategoriesScreen/MiniProductThumbnail";
import { requestListProductsByCategory } from "@/store/product/function";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";


const ItemCategoryWrapper = memo(function ItemCategoryWrapper({ item, active, setCategory }: {
  item: string,
  active: boolean,
  setCategory: (category: ECategory) => void
}) {
  const onSet = useCallback(() => {
    setCategory(item as ECategory);
  }, [active]);
  return (
    <SWrapper active={active}>
      <ItemCategory key={item} id={item} onPress={onSet} />
    </SWrapper>
  );
});


export const CategoriesScreen = memo(function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<ECategory>(ECategory.BIKE_ACCESSORIES);
  const listProducts = useProductByQuery(selectedCategory);
  const listCategories = useCategoryByQuery("all");
  const [loading,setLoading]= useState(false)

  useEffect(() => {
    setLoading(true)
    requestListProductsByCategory(selectedCategory).then();
    setLoading(false)
  }, [selectedCategory]);


  return (
    <FullScreenWrapper>
      <CustomHeader title={"Danh mục"} />
      <View style={{
        paddingHorizontal: 24,
        marginBottom: 12
      }}>
        <SearchBar />
      </View>
      <SContainer>
        <LeftSide>
         <ScrollView>
           {[...listCategories, "service"].map((item) => <ItemCategoryWrapper setCategory={setSelectedCategory}
                                                                              key={item} item={item}
                                                                              active={selectedCategory === item} />)}
         </ScrollView>
        </LeftSide>
        <FlatList data={[...listProducts]} numColumns={3}
                  columnWrapperStyle={{
                    gap: 12
                  }}
                  style={{
                    flex: 1,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 12
                  }}
                  renderItem={({ item }) => <MiniProductThumbnail id={item} />}
                  ListEmptyComponent={<EmptyView title="No products found" />}
        />
      </SContainer>
      <AnimatedBottomSpace/>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: white;
  flex-direction: row;
  gap: 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;

const LeftSide = styled.View`
  border-radius: 10px;
  padding-top: 24px;
  background-color: rgba(255, 181, 155, 0.18);
  width: 75px;
`;
const SWrapper = styled.View<{ active: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 12px 0;
  align-items: center;
  border-left-width: ${p => p.active ? 3 : 0}px;
  border-left-color: #BD3505;
  border-left-style: solid;
  background-color: ${p => p.active ? "white" : "transparent"};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
