import { memo } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_SEARCH } from "@/assets";
import { openSearchScreen } from "@/utils/navigation";

export const SearchBar = memo(function SearchBar() {
  return (
    <SContainer onPress={openSearchScreen}>
      <STextInput>Tìm kiếm sản phẩm</STextInput>
      <SIcon source={IC_SEARCH} />
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  display: flex;
  height: 50px;
  padding-right: 16px;
  padding-left: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #FAFAFA;
`;
const STextInput = styled.Text`
  flex: 1;
  color: #C4C5C4;
  font-family: ${Fonts.Medium};
  font-size: 14px;
  z-index: -1;
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
