import React, { memo, useEffect, useState } from "react";
import styled from "styled-components/native";
import { IC_STAR_FILLED } from "@/assets";
import { Fonts } from "@/theme/Fonts";
import SimpleToast from "react-native-simple-toast";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { useProduct } from "@/store/product";
import { requestEditFeedback, requestSendFeedback } from "@/store/order/function";
import { LoadingModal } from "@/components/LoadingModal";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { View } from "react-native";
import { requestProduct } from "@/store/product/function";
import useAutoToastError from "@/hooks/useAutoToastError";
import { useAccount } from "@/zustand/account";

export const ItemProductFeedback = memo(function ItemProductFeedback({ id }: {
  id: string
}) {
  const item = useProduct(id);
  const account = useAccount()
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    () => requestProduct({ id }),
    [id]
  );
  useAutoToastError(firstError);
  const [feedbackId, setfeedbackId] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const [{ loading: loadingFeedback, error: errorFeedback }, onFeedback] = useAsyncFn(async () => {
    if(feedbackId){
      await requestEditFeedback({
        motobikeProductId: id,
        rate: rating,
        content
      },account.id,feedbackId);
    }
    else {
      await requestSendFeedback({
        motobikeProductId: id,
        rate: rating,
        content
      },account.id);
    }
    SimpleToast.show("Gửi đánh giá thành công");
  }, [rating, content, id,account,feedbackId]);

  useAutoToastError(errorFeedback);
  useEffect(() => {
    loadFirst().then();
  }, []);

  useEffect(()=>{
    item?.feedbackProducts.map((feedback)=>{
      if(feedback.customer.accountId === account.id){
        setRating(feedback.rate)
        setContent(feedback.content)
        setfeedbackId(feedback.id)
      }
    })
  },[item,account])

  return (
    <SContainer>
      <FlexSpaceBetween style={{
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        backgroundColor: "white"
      }}>
        <FlexCenter gap={12} style={{
          alignItems: "flex-start",
          flex: 1
        }}>
          <SImage source={{ uri: item?.images[0].imageUrl || "" }} />
          <View style={{
            gap: 8,
            flex: 1
          }}>
            <SName numberOfLines={2}>{item?.name}</SName>
          </View>
        </FlexCenter>
      </FlexSpaceBetween>
      <STextNormal>Chất lượng sản phẩm</STextNormal>
      <SStarWrapper>
        <SRatingWrapper onPress={() => {
          setRating(1);
        }}>
          <SIconStar source={IC_STAR_FILLED} active={rating > 0} />
        </SRatingWrapper>
        <SRatingWrapper onPress={() => {
          setRating(2);
        }}>
          <SIconStar source={IC_STAR_FILLED} active={rating > 1} />
        </SRatingWrapper>
        <SRatingWrapper onPress={() => {
          setRating(3);
        }}>
          <SIconStar source={IC_STAR_FILLED} active={rating > 2} />
        </SRatingWrapper>
        <SRatingWrapper onPress={() => {
          setRating(4);
        }}>
          <SIconStar source={IC_STAR_FILLED} active={rating > 3} />
        </SRatingWrapper>
        <SRatingWrapper onPress={() => {
          setRating(5);
        }}>
          <SIconStar source={IC_STAR_FILLED} active={rating > 4} />
        </SRatingWrapper>
      </SStarWrapper>
      <SFeedbackInput
        multiline
        value={content}
        onChangeText={setContent}
        placeholder={"Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé !"}
        placeholderTextColor={"#A1A1AA"} />
      <SActionButton onPress={onFeedback}>
        <STextNormal style={{
          color: "white"
        }}>{feedbackId ? 'Chỉnh sửa đánh giá' : 'Gửi đánh giá'}</STextNormal>
      </SActionButton>
      <LoadingModal isVisible={loadingFeedback} />
    </SContainer>
  );
});
const SContainer = styled.View`
  gap: 12px;
  margin-bottom: 12px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;
const SStarWrapper = styled.View`
  flex-direction: row;
  padding: 8px 20px;
  background: #FFF;
  border-radius: 10px;
  border: 1px solid #392E2E;
`;
const SFeedbackInput = styled.TextInput`
  border-radius: 12px;
  border: 2px solid #F4F4F5;
  background: #FFF;
  min-height: 120px;
  padding: 0 12px;
`;
const SRatingWrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const SIconStar = styled.Image<{ active: boolean }>`
  width: 24px;
  height: 24px;
  tint-color: ${p => p.active ? "#FFC107" : "#E5E5E5"};
`;
const SActionButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
`;
const SImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 8px;
  background-color: gray;
`;

const SName = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;
