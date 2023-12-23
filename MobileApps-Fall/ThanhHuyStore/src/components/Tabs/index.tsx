import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Tab from './Tab';
import TabsHeader from './TabsHeader';
import {TabInterface} from './types';
import styled from "styled-components/native";

const Wrapper = styled.View``;

interface TabsProps {
  children?: ReactElement<typeof Tab> | ReactElement<typeof Tab>[];
  currentTabIndex: number;
  onTabChange?: (tabIndex: number) => void;
}
export const Tabs = memo(function Tabs({
  children,
  currentTabIndex,
  onTabChange,
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(currentTabIndex || 0);
  }, [currentTabIndex]);

  const onChange = useCallback(
    (_index: number) => {
      onTabChange && onTabChange(_index);
      setActiveIndex(_index);
    },
    [activeIndex, onTabChange],
  );

  // @ts-ignore
  const tabs: TabInterface[] = useMemo(() => {
    return React.Children.map(
      // @ts-ignore
      children,
      (child: ReactElement<typeof Tab>, index) => {
        return {
          index,
          key: index,
          element: child,
          // @ts-ignore
          title: child.props.title,
        };
      },
    );
  }, [children]);

  return (
    <Wrapper>
      <TabsHeader
        activeIndex={activeIndex}
        tabs={tabs}
        setActiveIndex={onChange}
      />
      {tabs[activeIndex].element}
    </Wrapper>
  );
});

export default Tabs;

export {Tab};
