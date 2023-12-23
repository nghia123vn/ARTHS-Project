import styled from 'styled-components/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar,
} from './react-native-scrollable-tab-view';
import { Colors, styledValue } from "@/theme";
import { Fonts } from "@/theme/Fonts";

const SScrollableTabBar = styled(ScrollableTabBar)`
  border-bottom-width: 1px;
  border-bottom-color: ${styledValue.grey5};
  height: 44px;
  background-color: ${styledValue.backgroundColor};
`;

const SDefaultTabBar = styled(DefaultTabBar)`
  border-bottom-width: 1px;
  border-bottom-color: ${styledValue.grey5};
  height: 44px;
  background-color: ${styledValue.backgroundColor};
`;
const renderTabBar = (props: any) => {
  return (
    <SScrollableTabBar
      tabsContainerStyle={styles.tabsContainerStyle}
      {...props}
    />
  );
};

const renderDefaultTabBar = () => <SDefaultTabBar tabStyle={styles.tabStyle} />;

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 0,
  },
  tabsContainerStyle: {
    height: 43,
  },
  tabBarTextStyle: {
    fontFamily: Fonts.Bold,
    borderBottomWidth: 0,
    paddingBottom: 4,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  defaultTabBarTextStyle: {
    fontFamily: Fonts.Bold,
    borderBottomWidth: 0,
    alignItems: 'center',
    textAlignVertical: 'center',
    fontSize: 14
  },
  tabBarUnderline: {
    height: 3,
    backgroundColor: '#333',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export const STabView = styled(ScrollableTabView).attrs(props => ({
  tabBarTextStyle: styles.tabBarTextStyle,
  tabBarInactiveTextColor: props.theme.grey2,
  tabBarActiveTextColor: props.theme.grey1,
  tabBarUnderlineStyle: {
    height: 3,
    backgroundColor: props.theme.primaryColor
  },
  renderTabBar: renderTabBar,
}))``;

export const SDefaultTabView = styled(ScrollableTabView).attrs(props => ({
  tabBarTextStyle: styles.defaultTabBarTextStyle,
  tabBarInactiveTextColor: props.theme.grey2,
  tabBarActiveTextColor: Colors.primary,
  tabBarUnderlineStyle: {
    height: 2,
    backgroundColor: props.theme.primaryColor,
  },
  renderTabBar: renderDefaultTabBar,
}))``;

export const TabViewItem = styled.View<{tabLabel: string}>`
  flex: 1;
`;
