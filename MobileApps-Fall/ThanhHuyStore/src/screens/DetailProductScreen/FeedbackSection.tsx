import { memo } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { IC_STAR_FILLED } from "@/assets";
import { IFeedbackProduct } from "@/store/product/type";
import { ReviewThumbnail } from "@/components/ReviewThumbnail";
import { EmptyView } from "@/components/EmptyView";
import { navigateToDetailProductReview } from "@/utils/navigation";

interface FeedbackSectionProps {
  feedbackProducts: IFeedbackProduct[];
  averageRating: number;
}

export const FeedbackSection = memo(function FeedbackSection(props: FeedbackSectionProps) {
  const { feedbackProducts, averageRating } = props;

  return (
    <SContainer>
      <SHeader>
        <STitle>{`Đánh giá (${feedbackProducts.length})`}</STitle>
        <FlexCenter>
          <SImage source={IC_STAR_FILLED} />
          <STitle>{averageRating.toFixed(2)}</STitle>
        </FlexCenter>
      </SHeader>
      {
        feedbackProducts.length > 0 ? feedbackProducts.slice(0, 3).map((feedbackProduct, index) => <ReviewThumbnail
            key={index} feedback={feedbackProduct} />)
          : <EmptyView title={"Hiện tại chưa có đánh giá nào"} />
      }
      <SButton onPress={() => {
        navigateToDetailProductReview({
          feedbackProducts,
          averageRating
        });
      }}>
        <SText>Xem Tất Cả Đánh Giá</SText>
      </SButton>
    </SContainer>
  );
});

const SContainer = styled.View`
  gap: 12px;
  border-top-width: 1px;
  border-top-color: #EDEDED;
  margin-top: 12px;
  padding-top: 12px;
`;
const SHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.2px;
`;

const SImage = styled.Image`
  width: 16px;
  height: 16px;
  tint-color: #FFC120;
`;
const SButton = styled.TouchableOpacity`
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #0C1A30;
  background: #FFF;
`;
const SText = styled.Text`
  color: #0C1A30;
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
