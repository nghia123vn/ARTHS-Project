import { RowCenter, SColumn } from "@/utils/helper";
import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native";
import { Ticker } from "@/store/exchanges/type";
import { useExchange } from "@/store/exchanges";

const ItemMarketTab = memo(function ItemMarketTab(props: { item: Ticker, index: number }) {
  const { item, index } = props;
  return (
    <TouchableOpacity>
      <RowCenter style={{ width: "100%", marginTop: 24 }}>
        <SColumn width={30} style={{ justifyContent: "flex-start" }}>
          <STextTable>{`${item.base}${item.target}`}</STextTable>
        </SColumn>
        <SColumn width={20}>
          <STextTable>{item.converted_last.usd}</STextTable>
        </SColumn>
        <SColumn width={40}>
          <STextTable>{item.volume}</STextTable>
        </SColumn>
        <SColumn width={10}>
          <STrustScore bgColor={item.trust_score || "yellow"} />
        </SColumn>
      </RowCenter>
    </TouchableOpacity>
  );
});

export const MarketTab = memo(function MarketTab({id}:{id:string}){
  const data = useExchange(id)?.tickers || []

  const renderItem = useCallback(({ item, index }: any) => {
    return <ItemMarketTab item={item} index={index} key={index} />;
  }, []);
  const renderHeader = useCallback(() => {
    return (
      <RowCenter style={{ width: "100%", marginTop: 24 }}>
        <SColumn width={30} style={{ justifyContent: "flex-start" }}>
          <STextTable>PAIR</STextTable>
        </SColumn>
        <SColumn width={20}>
          <STextTable>PRICE</STextTable>
        </SColumn>
        <SColumn width={35}>
          <STextTable>24H VOLUME</STextTable>
        </SColumn>
        <SColumn width={15}>
          <STextTable>TRUST</STextTable>
        </SColumn>
      </RowCenter>
    );
  }, []);
  return (
    <SContainer>
      <FlatList data={data} renderItem={renderItem} ListHeaderComponent={renderHeader} keyExtractor={(item,index)=>index.toString()} showsVerticalScrollIndicator={false}/>
    </SContainer>
  );
});
const SContainer = styled.View`
  background-color: white;
  flex: 1;
`;
const STextTable = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #6C757D;
`;
const STrustScore = styled.View<{ bgColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${p => p.bgColor};
`;
