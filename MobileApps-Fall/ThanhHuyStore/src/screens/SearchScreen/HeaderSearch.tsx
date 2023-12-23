import { memo } from "react";
import { FlexCenter } from "@/helper/styles";
import styled from "styled-components/native";
import { IC_BACK, IC_BELL, IC_SEARCH } from "@/assets";
import { goBack, navigateToPriceAlertScreen } from "@/utils/navigation";

export const HeaderSearch = memo(function HeaderPortfolio() {
  return (
    <SRowSpaceBetween>
      <SText>Tìm kiếm</SText>
    </SRowSpaceBetween>
  );
});
const SRowSpaceBetween = styled(FlexCenter)`
  justify-content: space-between;
`;
const SIconWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const SText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #212529;
`;
