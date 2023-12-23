import { memo, useMemo } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { View } from "react-native";
import { IC_STAR_FILLED, IC_STAR_OUTLINED } from "@/assets";
import { IFeedbackProduct } from "@/store/product/type";
import { useNavigationParams } from "@/hooks";
import { ReviewThumbnail } from "@/components/ReviewThumbnail";
import { EmptyView } from "@/components/EmptyView";



const SItemRating = memo(function SItemRating({
  rate,
  count,
  total
                                              }:{
  rate:number,
  count:number,
  total:number
}) {
  return (
    <FlexCenter gap={8}>
      {
        [...Array(5)].map((_,index)=>{
          if(index < rate){
            return <SIconStar style={{
              tintColor:'#FFC120'
            }} key={index} source={IC_STAR_FILLED}/>
          }
          else return <SIconStar style={{
            tintColor:'#C4C5C4'
          }} key={index} source={IC_STAR_OUTLINED}/>
        })
      }
      <SSliderRating>
        <SRatingSlider count={count} total={total}/>
      </SSliderRating>
      <STextNormal>{count}</STextNormal>
    </FlexCenter>
  )
})
export interface FeedbackScreenParams {
  feedbackProducts: IFeedbackProduct[];
  averageRating:number
}
export const DetailProductReview = memo(function DetailProductReview() {
  const {feedbackProducts,averageRating} = useNavigationParams<FeedbackScreenParams>()

  const ratingsCount = useMemo(()=>{
    return getRatingCounts(feedbackProducts)
  },[])
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Đánh giá sản phẩm"}  />
      <SContainer>
        <FlexCenter>
          <View style={{
            paddingRight:16,
            borderRightColor:'#E5E5E5',
            borderRightWidth:1
          }}>
            <FlexCenter style={{
              alignItems:'flex-end'
            }}>
              <SRating>{averageRating}</SRating>
              <SMaxRating>/5</SMaxRating>
            </FlexCenter>
            <STextNormal>{`${feedbackProducts.length} reviews`}</STextNormal>
          </View>
          <View style={{
            paddingLeft:16
          }}>
            {ratingsCount.map((item,index)=>{
              // @ts-ignore
              return <SItemRating key={index} rate={item.rate} count={item.count} total={feedbackProducts.length}/>
            })}
          </View>
        </FlexCenter>
        <View style={{
          borderTopColor:'#E5E5E5',
          paddingTop:24,
          borderTopWidth:1,
          gap:32,
        }}>
          {
            feedbackProducts.length > 0 ? feedbackProducts.map((feedbackProduct,index)=><ReviewThumbnail key={index} feedback={feedbackProduct}/>)
              : <EmptyView title={"Hiện tại chưa có đánh giá nào"}/>
          }
        </View>
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  gap: 32px;
  padding: 12px 24px;
  border-top-width: 1px;
  border-top-color: #EDEDED;
`;
const SRating = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 3px;
`;
const SMaxRating = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 14px;
  letter-spacing: 3px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  letter-spacing: 0.2px;
`;
const SIconStar = styled.Image`
  width: 14px;
  height: 14px;
`;
const SAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const STextContent = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const SCenterView = styled.View`
  align-items: center;
  justify-content: center;
`;
const SSliderRating = styled.View`
  height: 4px;
  background-color: #EDEDED;
  width: 100px;
`
const SRatingSlider = styled.View<{ count: number,total:number }>`
  height: 4px;
  background-color: #FFC120;
  width: ${({ count,total })=>`${count/total*100}`}px;
`
const getRatingCounts = (data:IFeedbackProduct[]) => {
  const ratingCounts:any = {};

  // Initialize counts for all possible ratings to 0
  Array.from({ length: 5 }, (_, i) => i + 1).forEach((rate) => {
    ratingCounts[rate] = 0;
  });

  // Count the occurrences of each rating
  data.forEach((item) => {
    const rate = item.rate;
    ratingCounts[rate]++;
  });

  // Convert the ratingCounts object into an array of objects
  const result = Object.entries(ratingCounts).map(([rate, count]) => ({
    rate: parseInt(rate),
    count,
  }));

  return result;
};
