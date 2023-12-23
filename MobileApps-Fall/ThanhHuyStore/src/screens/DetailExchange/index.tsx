import { memo, useEffect, useState } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import styled from "styled-components/native";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderDetailExchange } from "@/screens/DetailExchange/HeaderDetailExchange";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { useNavigationParams } from "@/hooks";
import { useExchange } from "@/store/exchanges";
import { FlexCenter } from "@/helper/styles";
import { Colors } from "@/theme";
import { SDefaultTabView, TabViewItem } from "@/components/Tabs/TabView";
import { VolumeTab } from "@/screens/DetailExchange/VolumeTab";
import { MarketTab } from "@/screens/DetailExchange/MarketTab";
import { IMotobikeProductPrice, IRepairService } from "@/store/product/type";
import { requestDiscountById } from "@/store/discount/function";

export interface DetailExchangeParams {
  id: string;
}

export const DetailExchange = memo(function DetailExchange() {
  const { aTop } = useAnimatedSafeAreaInsets();
  const animatedPaddingTop = useAnimatedStyle(() => ({
    paddingTop: aTop.value
  }));
  const [motobikeProducts, setMotobikeProducts] = useState<IMotobikeProductPrice[]>([]);
  const [repairServices, setRepairServices] = useState<IRepairService[]>([]);
  const { id } = useNavigationParams<DetailExchangeParams>();
  const data = useExchange(id);
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    () => requestDiscountById(id),
    [id]
  );
  useEffect(() => {
    loadFirst().then();
  }, [id]);
  const onChangeTab = (val: any) => {
  };

  return (
    <SContainer style={animatedPaddingTop}>
      <HeaderDetailExchange imageUrl={data?.image || ""} name={data?.name || ""} />
      <FlexCenter style={{ marginLeft: 12, marginTop: 12 }}>
        <SGreyBox>
          <STextGreyBox>{`Rank #${data?.trust_score_rank}`}</STextGreyBox>
        </SGreyBox>
        <SGreyBox>
          <STextGreyBox>{`${data?.centralized === true ? "Centralized" : "Normalized"}`}</STextGreyBox>
        </SGreyBox>
        <SGreyBox>
          <STextGreyBox>{`Trust ${data?.trust_score}/10`}</STextGreyBox>
        </SGreyBox>
      </FlexCenter>
      <SDefaultTabView locked={true} onChangeTab={onChangeTab}>
        <TabViewItem tabLabel={"Volume"}>
          <VolumeTab id={id} />
        </TabViewItem>
        <TabViewItem tabLabel={"Market"}>
          <MarketTab id={id} />
        </TabViewItem>
      </SDefaultTabView>
    </SContainer>
  );
});

const SContainer = styled(Animated.View)`
  background-color: white;
  flex: 1;
  padding: 16px;
`;
const SGreyBox = styled.View`
  padding: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.grey3};
  margin-right: 12px;
  border-radius: 4px;
`;
const STextGreyBox = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #212529;
`;
