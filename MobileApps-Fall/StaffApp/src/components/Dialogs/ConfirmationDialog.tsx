import React, {ComponentProps, memo, PropsWithChildren} from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import {useAsyncFn} from "../../hooks";
import {ActivityIndicator} from "react-native";
import {IC_X} from "../../assets";
import {Fonts} from "@/theme/Fonts";
import {flatStyles} from "@/utils/array";

const SWrapper = styled.View`
  border-radius: 16px;
  background-color: #ffffff;
  overflow: hidden;
`;

const SBodyWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin: 12px 16px;
`;

const SContentText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.grey1};
`;

const SButtonsWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 0 16px 8px;
`;

const SButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 16px;
  background-color: ${(p) => p.theme.primaryColor}20;
  border-radius: 8px;
`;

const SButtonIndicator = styled.ActivityIndicator.attrs(
    (props): ComponentProps<typeof ActivityIndicator> => ({
        // @ts-ignore
        color: props.color ? props.color : props.theme.primaryColor,
        // size: 32,
    })
)<{ color?: string }>`
  margin-right: 8px;
`;

const SButtonText = styled.Text<{ color?: string }>`
  color: ${(props) => (props.color ? props.color : props.theme.primaryColor)};
  text-align: center;
  font-size: 16px;
  font-family: ${Fonts.Medium};
`;

const HeaderWrapper = styled.View`
  padding: 12px;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  flex-direction: row;
`;

const TitleWrapper = styled.View`
  align-items: center;
  margin-top: 4px;
`;

const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.grey1};
  font-size: 20px;
  font-family: ${Fonts.Bold};
`;

const HeaderIconBtn = styled.TouchableOpacity.attrs((p) => ({
    hitSlop: {
        top: 8,
        left: 8,
        right: 8,
        bottom: 8,
    },
}))`
  align-items: center;
  justify-content: center;
`;

const HeaderIcon = styled.Image`
  color: ${(props) => props.theme.grey3};
  width: 24px;
  height: 24px;
`;

interface HeaderProps {
    title?: string;
    onCloseRequest: () => any;
}

const Header = memo(({onCloseRequest}: HeaderProps) => {
    return (
        <HeaderWrapper>
            <HeaderIconBtn onPress={onCloseRequest}>
                <HeaderIcon source={IC_X}/>
            </HeaderIconBtn>
        </HeaderWrapper>
    );
});

const Button = memo(
    ({
         index,
         button,
         onCloseRequest,
     }: {
        index: number;
        button: ButtonInterface;
        onCloseRequest: () => any;
    }) => {
        const [pressState, press] = useAsyncFn(async () => {
            if (button.onPress) {
                const p = button.onPress();
                if (p.then) await p;
            }
            onCloseRequest();
        }, [button, onCloseRequest]);

        const dynamicStyle = button.backgroundColor
            ? {backgroundColor: button.backgroundColor}
            : {};
        const marginStyle = index !== 0 ? {marginLeft: 12} : {};

        return (
            <SButtonWrapper
                style={flatStyles(dynamicStyle, marginStyle)}
                disabled={pressState.loading || button.loading}
                key={button.text}
                onPress={press}
            >
                {(pressState.loading || button.loading) && (
                    <SButtonIndicator color={button.color}/>
                )}
                <SButtonText color={button.color}>{button.text}</SButtonText>
            </SButtonWrapper>
        );
    }
);

interface ButtonInterface {
    text: string;
    color?: string;
    backgroundColor?: string;
    onPress?: () => any;
    loading?: boolean;
}

interface Props {
    isVisible: boolean;
    onCloseRequest: () => any;
    content?: string;
    buttons: ButtonInterface[];
    title?: string;
    disableSwipe?: boolean;
}

export const ConfirmationDialog = memo(
    ({
         children,
         isVisible,
         onCloseRequest,
         content,
         buttons,
         title,
         disableSwipe,
     }: PropsWithChildren<Props>) => {
        return (
            <Modal
                isVisible={isVisible}
                onDismiss={onCloseRequest}
                onBackdropPress={onCloseRequest}
                onBackButtonPress={onCloseRequest}
                avoidKeyboard={true}
                presentationStyle={"overFullScreen"}
                swipeDirection={disableSwipe ? undefined : "down"}
                onSwipeComplete={onCloseRequest}
                propagateSwipe={!disableSwipe}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
            >
                <SWrapper>
                    <Header onCloseRequest={onCloseRequest}/>

                    <TitleWrapper>
                        <HeaderTitle>{title}</HeaderTitle>
                    </TitleWrapper>

                    {!!content && (
                        <SBodyWrapper>
                            <SContentText>{content}</SContentText>
                        </SBodyWrapper>
                    )}

                    {children}

                    <SButtonsWrapper>
                        {buttons.map((button, index) => (
                            <Button
                                index={index}
                                key={button.text || "index-" + index}
                                button={button}
                                onCloseRequest={onCloseRequest}
                            />
                        ))}
                    </SButtonsWrapper>
                </SWrapper>
            </Modal>
        );
    }
);
