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
import { IMG_EMPTY_SEARCH } from "@/assets";

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

interface EmptyViewProps {
  style?: ViewStyle;
  image?: ImageRequireSource;
  size?: number;
  title:string;
}

export const EmptyView = memo(({image, style, size,title}: EmptyViewProps) => {
  return (
    // @ts-ignore
    <SContainer style={style}>
      <SImage source={IMG_EMPTY_SEARCH} size={size} />
      <STextBlack style={{marginTop:16}}>{title}</STextBlack>
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
  color: ${p => p.theme.grey1};
`;

const STextBold = styled.Text`
  color: ${p => p.theme.grey1};
  font-size: 24px;
  font-family: ${Fonts.Bold};
  margin-top: 12px;
  margin-bottom: 4px;
`;

const STextBlack = styled(SSubText)`
  font-size: 16px;
  font-family: ${Fonts.Medium};
  color:#000000;
`;
