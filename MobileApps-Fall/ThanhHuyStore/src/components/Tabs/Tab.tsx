import React, {ReactElement} from 'react';
import styled from "styled-components/native";

const TabWrapper = styled.View``;

interface TabProps {
  title: string;
  children?: ReactElement | ReactElement[];
}
export const Tab = function Tab({children}: TabProps) {
  return <TabWrapper>{children}</TabWrapper>;
};

export default Tab;
