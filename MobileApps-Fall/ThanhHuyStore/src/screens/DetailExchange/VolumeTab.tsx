import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { getExchangeVolumeRange } from "@/store/exchanges/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { PriceChart } from "@/components/PriceChart";
import { ActivityIndicator } from "react-native";
import { useExchange } from "@/store/exchanges";

export const VolumeTab = memo(function VolumeTab({ id }: { id: string }) {
  const [marketRange, setMarketRange] = useState<number[][]>([]);
  const [days, setDays] = useState(1);
  const dataExchange = useExchange(id);

  const labels = useMemo(() => {
    const _label: string[] = [];
    for (let i = 0; i < marketRange.length; i = i + Math.floor((marketRange.length / 4))) {
      _label.push(days === 1 ? moment(marketRange[i][0]).format("LT") : moment(marketRange[i][0]).format("MMM Do"));
    }
    return _label;
  }, [marketRange, days]);

  const dataSet = useMemo(() => {
    const _data: number[] = [];
    marketRange.map((item) => {
      _data.push(Math.round(item[1]));
    });
    return _data;
  }, [marketRange]);

  const [{ loading: firstLoading, error: firstError }, loadRange] = useAsyncFn(
    () => getExchangeVolumeRange(id,days),
    [days, id]
  );
  useEffect(() => {
    loadRange().then(res => {
      setMarketRange(res);
    });
  }, [days, id]);
  return (
    <SContainer>
      {marketRange.length === 0 ? <ActivityIndicator /> : <PriceChart labels={labels} priceData={dataSet} />
      }
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
      <STextNormal>Info</STextNormal>
      <SWhiteBoxWrapper>
        <SRowSpaceBetween>
          <STextGrey>Year Established</STextGrey>
          <STextNormal>{dataExchange?.year_established}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Homepage</STextGrey>
          <STextNormal numberOfLines={1}>{dataExchange?.url}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Twitter</STextGrey>
          <STextNormal numberOfLines={1}>{`twitter.com/${dataExchange?.twitter_handle}`}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Telegram</STextGrey>
          <STextNormal numberOfLines={1}>{dataExchange?.telegram_url}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Facebook</STextGrey>
          <STextNormal numberOfLines={1}>{dataExchange?.facebook_url}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Reddit</STextGrey>
          <STextNormal numberOfLines={1}>{dataExchange?.reddit_url}</STextNormal>
        </SRowSpaceBetween>
        <SRowSpaceBetween>
          <STextGrey>Other website</STextGrey>
          <STextNormal numberOfLines={1}>{dataExchange?.other_url_2}</STextNormal>
        </SRowSpaceBetween>
      </SWhiteBoxWrapper>
    </SContainer>

  );
});
const SContainer = styled.View`
  background-color: white;
  padding: 16px;
  flex: 1
`;
const SRowSpaceBetween = styled.View`
align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-color: #EBEBEB;
  border-bottom-width: 1px;
  padding:12px 0;
`
const OptionTimeRange = styled.TouchableOpacity<{ active: boolean }>`
  align-items: center;
  justify-content: center;
  background: #F8F9FA;
  border: ${p => p.active ? "0.5px solid #0063F5" : "0.5px solid #DFE2E4"};
  border-radius: 20px;
  padding: 6px 12px;
`;
const STextNormal = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #242424;
  max-width: 140px;
`
const SWhiteBoxWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
  border-radius: 8px;
  padding: 16px
`;
const STextGrey = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #6C757D;
`
