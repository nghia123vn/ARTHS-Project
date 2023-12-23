import { memo, useCallback, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FlexCenter } from "@/helper/styles";
import { IC_PLUS_RED } from "@/assets";
import { goBack, navigateToEditAddressScreen } from "@/utils/navigation";
import { useNavigationParams } from "@/hooks";
import { useAddress, useAddressByQuery } from "@/store/address";

interface ItemAddressProps {
  item: string;
  index: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const ItemAddress = memo(function ItemAddress(props: ItemAddressProps) {
  const { item, index, selectedIndex, setSelectedIndex } = props;
  const address = useAddress(item)
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: 8,
      paddingHorizontal: 20,
      justifyContent: "space-between"
    }}>
      <FlexCenter style={{
        alignItems: "flex-start",
        gap: 8
      }}>
        <SCheckBoxWrapper onPress={() => {
          setSelectedIndex(index);
          goBack()
        }}>
          {index === selectedIndex ? <SChecked /> : null}
        </SCheckBoxWrapper>
        <View style={{
          maxWidth:'80%'
        }}>
          {index === 0 ? <STextNormal>Địa chỉ nhận hàng (Mặc định)</STextNormal> :
            <STextNormal>Địa chỉ nhận hàng</STextNormal>}
          <STextNormal>{`Tên: ${address?.name} | ${address?.phoneNumber}`}</STextNormal>
          <STextNormal>{address?.address}</STextNormal>
        </View>
      </FlexCenter>
      <TouchableOpacity onPress={() => {
        navigateToEditAddressScreen({ index });
      }}>
        <STextNormal style={{
          color: "#F00"
        }}>Sửa</STextNormal>
      </TouchableOpacity>
    </View>
  );
});

export interface ChangeAddressScreenParams {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export const ChangeAddressScreen = memo(function ChangeAddressScreen() {
  const { selectedIndex, setSelectedIndex } = useNavigationParams<ChangeAddressScreenParams>();
  const address = useAddressByQuery('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Chọn địa chỉ nhận hàng"} />
      <FlatList data={address}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListFooterComponent={<TouchableOpacity
                  onPress={() => {
                    navigateToEditAddressScreen({ index: -1 });
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                  <SIcon source={IC_PLUS_RED} />
                  <STextNormal>Thêm địa chỉ nhận hàng khác</STextNormal>
                </TouchableOpacity>}
                renderItem={
                  ({ item, index }) => <ItemAddress item={item} index={index} selectedIndex={selectedIndex}
                                                    setSelectedIndex={setSelectedIndex} />
                } keyExtractor={(item) => item.toString()} />
    </FullScreenWrapper>
  );
});
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const SCheckBoxWrapper = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 2px solid #E2E8F0;
`;
const SChecked = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 6px solid #BD3505;
  background: #FFF;
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
