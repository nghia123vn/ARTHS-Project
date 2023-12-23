import styled from "styled-components/native";
import React, {memo, PropsWithChildren, ReactElement} from 'react';
import {ImageSourcePropType, TouchableOpacity} from 'react-native';
import { Colors } from "@/theme";


export const Divider = styled.View<{height?: number, color?: string}>`
  width: 100%;
  border-top-width: ${p => p.height || 1}px;
  border-top-color: ${p => p.color || (p?.height && p.height > 1 ? '#242424' : '#EBEBEB')};
`;

export const Bold = styled.Text`
  font-family: 'Roboto-Bold',serif;
`;

export const Row = styled.View`
  flex-direction: row;
`;
const ItemContainer = styled.View`
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const Icon = styled.Image`
  margin: 8px 8px 6px -4px;
  width: 24px;
  height: 24px;
  tint-color:#C7C7C7;
`;

const Label = styled.Text`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-right: 16px;
  font-size: 16px;
  color: #C7C7C7;
  max-width: 80%;
`;

const SDivider = styled.View`
  margin: 0 16px;
  height: 1px;
  background-color: #F5F5F5;
`;


interface ItemProps {
  icon?: ImageSourcePropType;
  label: string;
  divider?: boolean;
  children?: React.ReactNode;
}

export const Item = memo(
  ({icon, label, children, divider}: ItemProps) => {
    return (
      <>
        <ItemContainer>
          {icon && <Icon source={icon}/>}
          <Label>{label}</Label>
          {children}
        </ItemContainer>
        {divider && <SDivider/>}
      </>
    );
  },
);

interface ClickableItemProps extends ItemProps {
  disabled?: boolean;
  onPress?: () => void;
}

export const ClickableItem = memo(
  ({disabled, onPress, ...itemProps}: ClickableItemProps) => {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Item {...itemProps} />
      </TouchableOpacity>
    );
  },
);

interface SimpleClickableItemProps
  extends Omit<ClickableItemProps, 'children'> {
  content?: string;
}

export const SimpleClickableItem = memo(
  ({content, ...itemProps}: SimpleClickableItemProps) => {
    return (
      <ClickableItem {...itemProps}>
        <ClickableText clickable={!itemProps.disabled}>{content}</ClickableText>
      </ClickableItem>
    );
  },
);
export const SimpleItem = memo(function SimpleItem({
                                                     content,
                                                     ...props
                                                   }: ItemProps & { content?: string }) {
  return (
    <Item {...props}>
      <ItemContent>{content}</ItemContent>
    </Item>
  );
});

export const ItemContent = styled.Text`
  flex: 1;
  font-size: 16px;
  text-align: right;
  margin: 13px 0;
  color: #242424;
`;

export const ClickableText = styled(ItemContent)<{ clickable?: boolean }>`
  color: ${(props) => (props.clickable ? '#BD3505' : props.theme.grey1)};
`;

const SectionContainer = styled.View<{ withDivider: boolean }>`
  height: 44px;
  margin: 8px 16px 0 16px;
  flex-direction: row;
  border-bottom-color: ${Colors.grey5}80;
  border-bottom-width: ${(props) => (props.withDivider ? 1 : 0)}px;
  justify-content: space-between;
`;

const SectionText = styled.Text`
  font-size: 18px;
  color: ${Colors.grey1};
  margin-top: 12px;
  text-align: left;
  font-weight: bold;
`;

interface SectionTitleProps {
  title: string;
  withDivider?: boolean;
  children?: ReactElement | ReactElement[];
}

export const SectionTitle = memo(function SectionTitle({
                                                         title,
                                                         withDivider = true,
                                                         children,
                                                       }: PropsWithChildren<SectionTitleProps>) {
  return (
    <SectionContainer withDivider={withDivider}>
      <SectionText>{title}</SectionText>
      {children}
    </SectionContainer>
  );
});

const Pad = styled.View`
  width: 100%;
  padding: 0 16px;
`;

export const FullDivider = memo(() => <Divider/>);
export const PadDivider = memo(() => (
  <Pad>
    <Divider/>
  </Pad>
));

const ItemSeparatorContainer = styled.View`
  width: 100%;
  padding: 0 16px;
`;

export const ItemSeparator = memo(() => (
  <ItemSeparatorContainer>
    <Divider/>
  </ItemSeparatorContainer>
));

export const ItemsWrapper = styled.View`
  width: 100%;
  padding: 8px 0;
`;

