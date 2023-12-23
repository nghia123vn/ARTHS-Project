import { memo } from "react";
import { FlexCenter } from "@/helper/styles";
import { goBack } from "@/utils/navigation";
import { IC_BACK, IC_BELL, IC_SEARCH, IC_STAR_OUTLINED } from "@/assets";
import styled from "styled-components/native";

interface HeaderDetailExchangeProps{
  imageUrl:string;
  name:string
}
export const HeaderDetailExchange = memo(function HeaderDetailCategory(props:HeaderDetailExchangeProps){
  const {imageUrl,name} = props;
  return (
    <FlexCenter style={{justifyContent:'space-between'}}>
      <FlexCenter>
        <SButtonBack onPress={goBack}>
          <SIcon source={IC_BACK}/>
        </SButtonBack>
        <SIcon source={{uri:imageUrl}}/>
        <STextTitle>{name}</STextTitle>
      </FlexCenter>
    </FlexCenter>
  )
})
const SButtonBack = styled.TouchableOpacity`
width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`
const SIcon = styled.Image`
width: 24px;
  height: 24px;
`
const STextTitle = styled.Text`
margin-left: 8px;
`
const STextSub = styled.Text`

`

