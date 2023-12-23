import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context/src/SafeAreaContext";
import { HeaderDetailCurrency } from "@/screens/DetailCurrency/HeaderDetailCurrency";
import { useNavigationParams } from "@/hooks";
import { useCoin, useCoinByQuery } from "src/store/example";
import { SDefaultTabView, TabViewItem } from "@/components/Tabs/TabView";
import { CategoriesTab } from "@/screens/MarketScreen/CategoriesTab";
import useAsyncFn from "@/hooks/useAsyncFn";
import { getCoinInfo, getMarketRange } from "@/store/example/function";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { FlexCenter } from "@/helper/styles";
import { PriceChart } from "@/components/PriceChart";
import moment from "moment";
import { InfoTab } from "@/screens/DetailCurrency/InfoTab";

export interface DetailCurrencyParams {
  id: string;
}

export const DetailCurrency = memo(function DetailCurrency() {
  const { id } = useNavigationParams<DetailCurrencyParams>();
  const { aTop } = useAnimatedSafeAreaInsets();
  const animatedPaddingTop = useAnimatedStyle(() => ({
    paddingTop: aTop.value
  }));
  const [marketRange, setMarketRange] = useState<number[][]>([]);
  const [days, setDays] = useState(1);
  const listSavedIds = useCoinByQuery('saved')

  const labels = useMemo(()=>{
    const _label:string[] =[]
    for (let i =0;i<marketRange.length;i=i+Math.floor((marketRange.length/4))){
      _label.push(days === 1 ? moment(marketRange[i][0]).format("LT") : moment(marketRange[i][0]).format("MMM Do"))
    }
    return _label;
  },[marketRange,days]);

  const dataSet= useMemo(()=>{
    const _data:number[] = []
    // marketRange.map((item)=>{
    //   _data.push(Number(item[1].toFixed(2)))
    // })
    for (let i =0;i<marketRange.length;i=i+Math.floor((marketRange.length/6))){
      _data.push(Number(marketRange[i][1].toFixed(7)))
    }
    return _data;
  },[marketRange]);
  const dataCoin = useCoin(id);

  const onChangeTab = (val: any) => {
  };

  const [{ loading, error }, loadRange] = useAsyncFn(
    () => getMarketRange(days, id),
    [days, id]
  );
  useEffect(() => {
    loadRange().then(res => {
      setMarketRange(res);
    });
  }, [days, id]);

  const [{ loading: firstLoading, error: firstError }, firstLoad] = useAsyncFn(
    () => getCoinInfo(id),
    [id]
  );
  useEffect(() => {
    firstLoad().then()
  }, []);

  return (
    <SContainer style={animatedPaddingTop}>
      <HeaderDetailCurrency image={dataCoin?.image || ""} title={dataCoin?.name || ""}
                            symbol={dataCoin?.symbol.toUpperCase() || ""} id={id} isSaved={listSavedIds.includes(id)} />
      <SDefaultTabView onChangeTab={onChangeTab} style={{ backgroundColor: "white" }}>
        <TabViewItem tabLabel={"Price Chart"}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            padding: 16
          }}>
              <FlexCenter>
              <STextPrice style={{ marginRight: 12 }}>${dataCoin?.current_price}</STextPrice>
              <STextPercentChange>{dataCoin?.price_change_percentage_24h}%</STextPercentChange>
            </FlexCenter>
          </View>
            {marketRange.length === 0 ? <ActivityIndicator/>: <PriceChart labels={labels} priceData={dataSet}/>}
            <SRowSpaceBetween>
              <OptionTimeRange active={days ===1} onPress={()=>setDays(1)}>
                <STextNormal>1D</STextNormal>
              </OptionTimeRange>
              <OptionTimeRange active={days ===14} onPress={()=>setDays(14)}>
                <STextNormal>14D</STextNormal>
              </OptionTimeRange>
              <OptionTimeRange active={days ===30} onPress={()=>setDays(30)}>
                <STextNormal>1M</STextNormal>
              </OptionTimeRange>
              <OptionTimeRange active={days ===365} onPress={()=>setDays(365)}>
                <STextNormal>1Y</STextNormal>
              </OptionTimeRange>
            </SRowSpaceBetween>
          <SWhiteBoxWrapper>
            <FlexCenter>
              <SItemTimeRange>
                <STextBold>1H</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_1h_in_currency.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
              <SItemTimeRange>
                <STextBold>24H</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_24h.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
              <SItemTimeRange>
                <STextBold>7D</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_7d_in_currency.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
              <SItemTimeRange>
                <STextBold>14D</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_14d_in_currency.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
              <SItemTimeRange>
                <STextBold>30D</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_30d_in_currency.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
              <SItemTimeRange>
                <STextBold>1Y</STextBold>
                <SItemPriceChange>{dataCoin?.price_change_percentage_1y_in_currency.toFixed(2)}%</SItemPriceChange>
              </SItemTimeRange>
            </FlexCenter>
          </SWhiteBoxWrapper>
        {/*  info*/}
          <SWhiteBoxWrapper>
            <SRowSpaceBetween>
              <STextGrey>Market Cap Rank</STextGrey>
              <STextNormal>#{dataCoin?.market_cap_rank}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Market Cap</STextGrey>
              <STextNormal>${dataCoin?.market_cap}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Fully Diluted Valuation</STextGrey>
              <STextNormal>${dataCoin?.fully_diluted_valuation}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Trading Volume</STextGrey>
              <STextNormal>${dataCoin?.total_volume}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>24H High</STextGrey>
              <STextNormal>${dataCoin?.high_24h}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>24H Low</STextGrey>
              <STextNormal>${dataCoin?.low_24h}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Available Supply</STextGrey>
              <STextNormal>{dataCoin?.max_supply}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Total Supply</STextGrey>
              <STextNormal>{dataCoin?.total_supply}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>Max Supply</STextGrey>
              <STextNormal>{dataCoin?.max_supply}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>All-Time High</STextGrey>
              <STextNormal>${dataCoin?.ath}</STextNormal>
            </SRowSpaceBetween>
            <SRowSpaceBetween>
              <STextGrey>All-Time Low</STextGrey>
              <STextNormal>${dataCoin?.atl}</STextNormal>
            </SRowSpaceBetween>
          </SWhiteBoxWrapper>
          </ScrollView>
        </TabViewItem>
        <TabViewItem tabLabel={"Info"}>
          <InfoTab id={id}/>
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
const OptionTimeRange = styled.TouchableOpacity<{ active: boolean }>`
  align-items: center;
  justify-content: center;
  background: #F8F9FA;
  border: ${p => p.active ? "0.5px solid #0063F5" : "0.5px solid #DFE2E4"};
  border-radius: 20px;
  padding: 6px 12px;
`;
const STextBold = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #343A40;
`;
const SWhiteBoxWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
  border-radius: 8px;
  padding: 16px
`;
const STextPrice = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  color: #212529;

`;
const STextPercentChange = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  /* Green */
  color: #21BF73;
`;
const SItemTimeRange = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SItemPriceChange = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: #D90429;
`
const SRowSpaceBetween = styled.View`
align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-color: #EBEBEB;
  border-bottom-width: 1px;
  padding:12px 0;
`
const STextGrey = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #6C757D;
`
const STextNormal = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #242424;
`
