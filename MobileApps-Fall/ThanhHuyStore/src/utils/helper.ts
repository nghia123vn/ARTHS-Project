import styled from "styled-components/native";

export const SColumn = styled.View<{ width: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: ${({ width }) => width}%;
`;
export const RowCenter = styled.View`
flex-direction: row;
  align-items: center;
`
