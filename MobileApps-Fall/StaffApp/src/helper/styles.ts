import styled from "styled-components/native";

export const FlexBox = styled.View`
  display: flex;
  flex-direction: row;
`;
export const FlexCenter = styled(FlexBox)<{
  gap?: number
}>`
  align-items: center;
  gap: ${({ gap }) => gap || 0}px;
`;
export const FlexSpaceBetween = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const CenterBox = styled(FlexCenter)`
  justify-content: center;
`;
export const SButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
