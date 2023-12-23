import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import { Fonts } from "@/theme/Fonts";
import { Colors } from "@/theme";


interface EmptySearchProps {
  style?: ViewStyle;
  image: ImageRequireSource;
  size?: number;
  buttons?: IButton[];
  title?: string;
  subTitle?: string;
}

interface IButton extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  loading?: boolean;
}

export const EmptySearchView = memo(
  ({style, image, size, title, subTitle, buttons}: EmptySearchProps) => {
    return (
      <SContainer
        style={{
          ...style,
        }}>
        <SImageView>
          <SImage source={image} size={size} />
          {title && <STextBold>{title}</STextBold>}
          {subTitle && <SSubText>{subTitle}</SSubText>}
        </SImageView>
      </SContainer>
    );
  },
);

interface EmptyViewProps {
  style?: ViewStyle;
  image?: ImageRequireSource;
  size?: number;
}

export const EmptyView = memo(({image, style, size}: EmptyViewProps) => {
  return (
    <SContainer style={style}>
      <SImage source={image} size={size} />
      <STextBlack style={{marginTop:16}}>{`No data`}</STextBlack>
    </SContainer>
  );
});

const SContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SImageView = styled.View`
  padding-horizontal: 16px;
  align-items: center;
  justify-content: center;
`;

const SImage = styled(FastImage)<{size?: number}>`
  width: ${p => p.size || 120}px;
  height: ${p => p.size || 120}px;
`;

const SSubText = styled.Text`
  font-size: 16px;
  font-family: ${Fonts.Regular};
  text-align: center;
  color: ${Colors.grey1};
`;

const STextBold = styled.Text`
  color: ${Colors.grey1};
  font-size: 24px;
  font-family: ${Fonts.Bold};
  margin-top: 12px;
  margin-bottom: 4px;
`;

const STextBlack = styled(SSubText)`
  font-size: 16px;
  font-family: ${Fonts.Regular};
`;
