import { memo } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { View } from "react-native";
import { FlexCenter } from "@/helper/styles";
import { IC_STAR_FILLED } from "@/assets";
import { IFeedbackProduct } from "@/store/product/type";

interface ReviewThumbnailProps {
  feedback: IFeedbackProduct;
}

export const ReviewThumbnail = memo(function ReviewThumbnail(props: ReviewThumbnailProps) {
  const { feedback } = props;
  return (
    <SContainer>
      <SAvatar source={{ uri: feedback?.customer.avatar }} />
      <View style={{
        gap: 10
      }}>
        <SName>{feedback.customer.fullName}</SName>
        <FlexCenter>
          <StarIcon active={feedback.rate > 0} source={IC_STAR_FILLED} />
          <StarIcon active={feedback.rate > 1} source={IC_STAR_FILLED} />
          <StarIcon active={feedback.rate > 2} source={IC_STAR_FILLED} />
          <StarIcon active={feedback.rate > 3} source={IC_STAR_FILLED} />
          <StarIcon active={feedback.rate > 4} source={IC_STAR_FILLED} />
        </FlexCenter>
        <SText>{feedback.content}</SText>
      </View>
    </SContainer>
  );
});
const SContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  gap: 12px;
`;
const SAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #b0acac;
`;
const SName = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.2px;
`;
const StarIcon = styled.Image<{ active: boolean }>`
  width: 14px;
  height: 14px;
  tint-color: ${p => p.active ? "#FFC120" : "#E5E5E5"};
`;
const SText = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
`;
