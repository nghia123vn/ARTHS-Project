import React, { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { MySearchBar } from "@/screens/SearchScreen/SearchBar";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { ActivityIndicator, FlatList, View } from "react-native";
import { RawSearchValue } from "@/screens/SearchScreen/type";
import { CustomHeader } from "@/components/CustomHeader";
import { useProductByQuery } from "@/store/product";
import { IProductQuery, requestListProducts, requestSearchProducts } from "@/store/product/function";
import { EmptyView } from "@/components/EmptyView";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { Fonts } from "@/theme/Fonts";
import { FilterBottomSheet } from "@/screens/SearchScreen/FilterBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useAutoToastError from "@/hooks/useAutoToastError";


export const SearchScreen = memo(function() {
  const [params, setParams] = useState<IProductQuery>({
    name: "",
    repairService: "",
    category: "",
    vehiclesName: "",
    discountId: ""
  });
  const sheetRef = useRef<BottomSheetModal>(null);


  const listProducts = useProductByQuery("search");

  const [isTexting, setTexting] = useState(false);
  const [value, setValue] = useState("");

  const [{ loading,error }, onRequest] = useAsyncFn(async (_value: any) => {
    const _params: IProductQuery = {
      name: _value.q,
      repairService: "",
      category: "",
      vehiclesName: "",
      discountId: ""
    };
    await requestSearchProducts(_params);
  }, []);
  useAutoToastError(error)
  const onChangeText = useCallback(
    async (q: string) => {
      await onRequest({ ...params, q });
      setTexting(false);
      setValue(q);
    },
    [onRequest, params]
  );

  const renderItem = useCallback(
    ({ item }: any) => (
      <ProductThumbnail id={item} key={item} />
    ),
    []
  );

  // useEffect(() => {
  //   onRequest(value).then(res=>{
  //     setSearchResult(res)
  //   });
  // }, [value]);


  return (
    <SContainer>
      <CustomHeader isBack title="Tìm kiếm" />
      <SHeader>
        <SSearchView>
          <MySearchBar
            isTexting={isTexting}
            placeholder={"Tìm kiếm sản phẩm..."}
            setTexting={setTexting}
            // value={value}
            onSearchTextChange={onChangeText}
            containerStyle={{
              backgroundColor: "#fafafa"
            }}
          />
        </SSearchView>
      </SHeader>
      <View
        style={{
          flex: 1,
          marginTop: 32
        }}>
        {/*//return products*/}
        {!isTexting && !loading && (
          <FlatList
            style={{
              flex:1
            }}
            numColumns={2}
            data={listProducts}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={<STextGrey>End of result</STextGrey>}
            ListEmptyComponent={
              <EmptyView
                title={"Không tìm thấy sản phẩm nào phù hợp"}
              />
            }
          />
        )}
        {(isTexting || loading) &&
          <ActivityIndicator />
        }
      </View>
      {/*<SFilterBox onPress={()=>{*/}
      {/*  sheetRef.current?.present();*/}
      {/*}}>*/}
      {/*  <SText>Lọc & Sắp xếp</SText>*/}
      {/*</SFilterBox>*/}
      <FilterBottomSheet ref={sheetRef}/>
    </SContainer>
  );
});
export default SearchScreen;

const SContainer = styled(Animated.View)`
  flex: 1;
  background-color: white;
  padding: 16px
`;

const SHeader = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-top: 12px;
`;
const SSearchView = styled.View`
  flex: 1;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 8px;
`;
const SFilterBox = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #0C1A30;
  background: #FFF;
`
const SText = styled.Text`
  color: #0C1A30;
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px; 
`
