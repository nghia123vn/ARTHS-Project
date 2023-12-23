import React, {memo} from 'react';
import {TabInterface} from './types';
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";

const TabsHeaderWrapper = styled.View`
  flex-direction: row;
  height: 44px;
  align-items: center;
`;

const TitleNormal = styled.Text`
  font-size: 16px;
  color: ${(p) => p.theme.grey1};
`;

const TitleActive = styled.Text`
  font-family: ${Fonts.Bold};
  font-size: 16px;
  color: ${(p) => p.theme.grey1};
`;

const ItemWrapperNormal = styled.TouchableOpacity`
  padding: 0 16px;
  height: 44px;
  justify-content: center;
  border-bottom-color: transparent;
  border-bottom-width: 2px;
`;

const ItemWrapperActive = styled.TouchableOpacity`
  padding: 0 16px;
  height: 44px;
  justify-content: center;
  border-bottom-color: ${(p) => p.theme.grey1};
  border-bottom-width: 2px;
`;

export const TabsHeader = memo(function TabHeader({
  tabs,
  activeIndex,
  setActiveIndex,
}: {
  tabs: TabInterface[];
  activeIndex: number;
  setActiveIndex: (index: number) => any;
}) {
  return (
    <TabsHeaderWrapper>
      {(tabs || []).map((tab, index) => {
        const Title = activeIndex === index ? TitleActive : TitleNormal;
        const ItemWrapper =
          activeIndex === index ? ItemWrapperActive : ItemWrapperNormal;
        return (
          <ItemWrapper key={index} onPress={() => setActiveIndex(index)}>
            <Title>{tab.title}</Title>
          </ItemWrapper>
        );
      })}
    </TabsHeaderWrapper>
  );
});

export default TabsHeader;
