import React, { memo } from "react";
import Modal, { ModalProps } from "react-native-modal";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@/theme";

const SModal = styled(Modal)`
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  background-color: white;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

interface LoadingModalProps extends Partial<ModalProps> {
}

export const LoadingModal = memo(function LoadingModal(
  props: LoadingModalProps
) {
  return (
    <SModal
      {...({ animationIn: "zoomIn", animationOut: "zoomOut" } as ModalProps)}
      useNativeDriver={true}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      presentationStyle={"overFullScreen"}
      statusBarTranslucent={true}
      {...props}
    >
      <Container>
        <ActivityIndicator size={24} color={Colors.primary} />
      </Container>
    </SModal>
  );
});
