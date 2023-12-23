import { FlexCenter } from "@/helper/styles";
import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { IC_BACK, IC_BELL, IC_SEARCH, IC_STAR_FILLED, IC_STAR_OUTLINED } from "@/assets";
import { goBack, navigateToPriceAlertScreen } from "@/utils/navigation";

interface HeaderDetailCurrencyProps {
  id: string;
  image: string;
  title: string;
  symbol: string;
  isSaved: boolean;
}

export const HeaderDetailCurrency = memo(function HeaderDetailCurrency(props: HeaderDetailCurrencyProps) {
  const { image, title, symbol, id, isSaved } = props;
  const savedCurrency = useCallback(() => {
  }, [id]);
  return (
    <FlexCenter style={{ justifyContent: "space-between" }}>
      <FlexCenter>
        <SButtonBack onPress={goBack}>
          <SIcon source={IC_BACK} />
        </SButtonBack>
        <SIcon source={{ uri: image }} />
        <STextTitle style={{marginLeft:8}}>{`${title}(${symbol})`}</STextTitle>
      </FlexCenter>
      <FlexCenter>
        <SIconWrapper onPress={navigateToPriceAlertScreen}>
          <SIcon source={IC_BELL} />
        </SIconWrapper>
        <SIconWrapper onPress={savedCurrency}>
          {
            isSaved ? <SIconSaved source={IC_STAR_FILLED} />
              : <SIcon source={IC_STAR_OUTLINED} />
          }
        </SIconWrapper>
      </FlexCenter>
    </FlexCenter>
  );
});
const SButtonBack = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const SIconWrapper = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin: 0 8px;
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
const STextTitle = styled.Text`

`;
const STextSub = styled.Text`

`;
const SIconSaved = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: #21BF73;
`;

