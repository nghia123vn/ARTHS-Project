import { memo, useEffect, useState } from "react";
import useAsyncFn from "@/hooks/useAsyncFn";
import { getCoinInfo } from "@/store/example/function";
import styled from "styled-components/native";
import { useWindowDimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import { useCoin } from "src/store/example";

export const InfoTab = memo(function({ id }:{id:string}){
  const data = useCoin(id)
  const { width } = useWindowDimensions();
  return (
<SContainer>
  <SWhiteBoxWrapper>
    <SRowSpaceBetween>
      <STextGrey>Homepage</STextGrey>
      <View>
        {data?.links?.homepage.map((item:any,index:number)=>{
          if (item!=='') return (
            <STextNormal numberOfLines={1} key={index}>{item}</STextNormal>
          )
        })}
      </View>
    </SRowSpaceBetween>
    <SRowSpaceBetween>
      <STextGrey>Blockchain/Supply</STextGrey>
      <View>
        {data?.links?.blockchain_site.map((item:any,index:number)=>{
          if (item!=='') return (
            <STextNormal numberOfLines={1} key={index}>{item}</STextNormal>
          )
        })}
      </View>
    </SRowSpaceBetween>
    <SRowSpaceBetween>
      <STextGrey>Twitter</STextGrey>
      <STextNormal>{data?.links?.twitter_screen_name}</STextNormal>
    </SRowSpaceBetween>
    <SRowSpaceBetween>
      <STextGrey>Facebook</STextGrey>
      <STextNormal>{data?.links?.facebook_username}</STextNormal>
    </SRowSpaceBetween>
  </SWhiteBoxWrapper>
  <RenderHtml
    baseStyle={{backgroundColor:'white',margin:16}}
    contentWidth={width}
    source={{ html: data?.description?.en || '' }}
  />
</SContainer>
  )
})
const SContainer = styled.ScrollView`
background-color: white;
`
const SWhiteBoxWrapper = styled.View`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.075);
  border-radius: 8px;
  padding: 16px
`;
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
  color: #84cc8e;
  max-width: 140px;
`
