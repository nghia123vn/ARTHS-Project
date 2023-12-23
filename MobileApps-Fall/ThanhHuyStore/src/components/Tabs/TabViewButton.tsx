import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
  ScrollableTabViewProperties,
} from 'react-native-scrollable-tab-view';
import { Colors } from "@/theme";
import styled from "styled-components/native";

const renderTabBar = () => (
  <ScrollableTabBar
    style={styles.containerTab}
    renderTab={(
      name,
      pageIndex,
      isTabActive,
      onPressHandler,
      onLayoutHandler,
    ) => (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.buttonTab}
        onLayout={onLayoutHandler}
        onPress={() => onPressHandler(pageIndex)}>
        <SViewContainerTab isActive={isTabActive}>
          <STextTab isActive={isTabActive}>{name}</STextTab>
        </SViewContainerTab>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  containerTab: {
    paddingTop: 8,
    paddingLeft: 8,
    borderBottomWidth: 0,
  },
  showDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.0,

    elevation: 3,
  },
  buttonTab: {
    height: 28,
  },
  tabBarStyle: {
    paddingHorizontal: 6,
    width: 120,
    borderWidth: 0,
  },
  tabBarTextStyle: {
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 0,
  },
  tabBarUnderline: {
    height: 0,
  },
});

interface ScrollTabViewButtonProps extends ScrollableTabViewProperties {
  children: React.ReactNode | React.ReactNode[];
  showDivider?: boolean;
  sref?: (ref: any) => void;
}

export const ScrollTabViewButton = memo(function ScrollTabViewButton(
  scrollProps: ScrollTabViewButtonProps,
) {
  const {children, showDivider, sref, ...restProps} = scrollProps;
  const refTabView = useCallback(
    (ref:any) => {
      if (sref) {
        sref(ref);
      }
    },
    [sref],
  );

  return (
    <ScrollableTabView
      tabBarTextStyle={styles.tabBarTextStyle}
      tabBarInactiveTextColor={Colors.grey3}
      tabBarActiveTextColor={Colors.grey4}
      tabBarUnderlineStyle={styles.tabBarUnderline}
      ref={refTabView}
      renderTabBar={() => (
        <SScrollableTabBar
          // style={[styles.containerTab, showDivider && styles.showDivider]}
          showDivider={showDivider || false}
          backgroundColor={Colors.white}
          renderTab={(
            name,
            pageIndex,
            isTabActive,
            onPressHandler,
            onLayoutHandler,
          ) => (
            <TouchableOpacity
              activeOpacity={0.65}
              style={styles.buttonTab}
              onLayout={onLayoutHandler}
              onPress={() => onPressHandler(pageIndex)}>
              <SViewContainerTab isActive={isTabActive}>
                <STextTab isActive={isTabActive}>{name}</STextTab>
              </SViewContainerTab>
            </TouchableOpacity>
          )}
        />
      )}
      {...restProps}>
      {children}
    </ScrollableTabView>
  );
});

export default ScrollTabViewButton;

const SScrollableTabBar = styled(ScrollableTabBar)<{showDivider: boolean}>`
  padding-top: 8px;
  padding-left: 8px;
  border-bottom-width: 0;
  box-shadow: ${(p) =>
    p.showDivider
      ? '0px 0.5px 1.5px rgba(0, 0, 0, 0.25)'
      : '0px 0px 0px rgba(0, 0, 0, 0)'};
  elevation: ${(p) => (p.showDivider ? 1 : 0)};
`;

export const STabViewButton = styled(ScrollableTabView).attrs({
  tabBarTextStyle: styles.tabBarTextStyle,
  tabBarInactiveTextColor: Colors.grey3,
  tabBarActiveTextColor: Colors.grey4,
  tabBarUnderlineStyle: styles.tabBarUnderline,
  renderTabBar: renderTabBar,
})``;

const SViewContainerTab = styled.View<{isActive: boolean}>`
  flex: 1;
  justify-content: center;
  border-radius: 4px;
  margin: 0px 4px;
  background-color: ${(props) =>
    props.isActive ? props.theme.blue : props.theme.white};
  border-width: ${(props) => (props.isActive ? 0 : 1)};
  border-color: ${(props) =>
    props.isActive ? Colors.grey1 : Colors.grey2};
`;

const STextTab = styled.Text<{isActive: boolean}>`
  padding: 0 16px;
  font-size: 13px;
  align-self: center;
  color: ${(props) => (props.isActive ? Colors.white : props.theme.grey2)};
`;

export const TabViewItem = styled.View<{tabLabel: string}>`
  flex: 1;
`;
