import * as React from 'react';
import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import { memoForwardRef } from "@/utils/functions";
import { interactManager } from "@/utils/wait";
import { useRefState } from "@/hooks/useRefState";
import { flatStyles } from "@/utils/array";
import { IC_SEARCH, IC_X } from "@/assets";

const GrayPlaceholder = styled(TextInput).attrs(props => ({
  placeholderTextColor: props.theme.grey2,
  selectionColor: '#007AFF',
}))`
  color: ${props => props.theme.grey1};
`;

const ModalGrayPlaceholder = styled(BottomSheetTextInput).attrs(props => ({
  placeholderTextColor: props.theme.grey2,
  selectionColor: '#007AFF',
}))`
  color: ${props => props.theme.grey1};
`;

interface OwnProps {
  containerStyle?: ViewStyle | ViewStyle[];
  iconStyle?: ImageStyle | ImageStyle[];
  inputContainerStyle?: ViewStyle | ViewStyle[];
  placeholder?: string;
  onSearchTextChange?: (text: string) => void;
  autoFocus?: boolean;
  value?: string;
  onFocus?: () => void;
  onEndEditing?: () => void;
  rightComponent?: React.ReactElement;
  leftComponent?: React.ReactElement;
  isOnModal?: boolean;
  setTexting?: Function;
  isTexting?: boolean;
}

type Props = OwnProps;

const SDarkIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${props => props.theme.grey2};
`;

const SSectionHeaderView = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  background-color: ${p => p.theme.grey6};
`;

const IconClose = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${p => p.theme.grey6};
`;

const ViewIcon = styled.View`
  background-color: ${props => props.theme.grey3};
`;
export const MySearchBar = memoForwardRef((props: Props) => {
  const [text, setText] = useRefState(props.value || '');
  const [, forceUpdate] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (props.autoFocus && props.isOnModal) {
      interactManager(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [props.autoFocus, props.isOnModal]);

  const onSearchTextChange = useCallback(
    _.debounce((_text: string) => {
      if (props.onSearchTextChange) {
        props.onSearchTextChange(_text.toLowerCase());
      }
    }, 300),
    [],
  );

  const onChangeText = useCallback(
    (_text: string) => {
      forceUpdate(p => !p);
      if (props.value) {
        return onSearchTextChange(_text);
      }

      if (!props?.isTexting) {
        props.setTexting && props.setTexting(true);
      }

      setText(_text);
      onSearchTextChange(_text);
    },
    [onSearchTextChange, props, setText],
  );

  const onClearText = () => {
    onChangeText('');
  };

  const DynamicTextInput = useMemo(
    () =>
      props.isOnModal && Platform.OS === 'ios'
        ? ModalGrayPlaceholder
        : GrayPlaceholder,
    [props.isOnModal],
  );

  const placeholder = useMemo(
    () => (props.placeholder ? props.placeholder : 'Search'),
    [props.placeholder],
  );

  return (
    <SSectionHeaderView style={flatStyles(props.containerStyle)}>
      {props.leftComponent}
      {/*// @ts-ignore*/}
      <DynamicTextInput
        ref={inputRef}
        keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
        style={flatStyles(styles.input, props.inputContainerStyle)}
        placeholder={placeholder}
        value={text}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoFocus={props.isOnModal ? false : props.autoFocus}
        onEndEditing={props.onEndEditing}
      />
      {text && !props.rightComponent ? (
        <TouchableOpacity onPress={onClearText} style={styles.btnClear}>
          <ViewIcon style={styles.viewIcon}>
            <IconClose style={styles.iconClear} source={IC_X} />
          </ViewIcon>
        </TouchableOpacity>
      ) : null}
      {/*{props.rightComponent}*/}
      <SDarkIcon
        style={flatStyles(styles.searchIcon, props.iconStyle)}
        source={IC_SEARCH}
      />
    </SSectionHeaderView>
  );
});

const styles = StyleSheet.create({
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 10,
    color: '#242424',
    fontWeight: '500',
  },
  btnClear: {
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClear: {
    width: 10,
    height: 10,
  },
  viewIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
