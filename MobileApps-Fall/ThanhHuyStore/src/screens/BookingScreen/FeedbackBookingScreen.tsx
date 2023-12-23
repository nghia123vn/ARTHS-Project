import React, { memo, useMemo, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { IC_STAR_FILLED } from "@/assets";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { requestFeedbackStaff, requestSendFeedback } from "@/store/order/function";
import SimpleToast from "react-native-simple-toast";
import useAutoToastError from "@/hooks/useAutoToastError";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { OrderDetail } from "@/store/order/type";
import { Staff } from "@/store/booking/type";
import { useNavigationParams } from "@/hooks";
import { useAccount } from "@/zustand/account";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { formatCurrency } from "@/utils/format";
import { LoadingModal } from "@/components/LoadingModal";

export interface FeedbackBookingScreenParams {
  orderDetails: OrderDetail[];
  staff?:Staff
}
export const FeedbackBookingScreen = memo(function FeedbackBookingScreen() {
  const {orderDetails,staff}=useNavigationParams<FeedbackBookingScreenParams>();
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [content, setContent] = useState("");
  const [contentStaff, setContentStaff] = useState("");
  const account = useAccount()
  const [{ loading: loadingFeedback, error: errorFeedback }, onFeedback] = useAsyncFn(async () => {
    if (orderDetails.length > 0) {
      const feedbackPromises = orderDetails.map((item) => {
        if (item.motobikeProduct) {
          // Create a promise for each feedback request
          return requestSendFeedback({
            motobikeProductId: item.motobikeProduct.id,
            rate: rating,
            content
          });
        }
        return Promise.resolve(); // Return a resolved promise for items without motobikeProduct
      });
      Promise.all(feedbackPromises)
        .then(() => {
          console.log("Feedbacks sent");
        })
        .catch((error) => {
          console.error("Error sending feedbacks", error);
        });
    }
    if(staff){
      await requestFeedbackStaff({
        staffId: staff.accountId,
        customerId: account.id,
        title: "Đánh giá nhân viên",
        content:contentStaff
      });
    }
    SimpleToast.show("Gửi đánh giá thành công");
  }, [rating, content,orderDetails,staff,account]);

  useAutoToastError(errorFeedback);
  const listItems = useMemo(() => {
    return (
      orderDetails.map((item, index) => {
        if (item.motobikeProduct) {
          return (
            <FlexSpaceBetween style={{
              borderBottomColor: "#E5E5E5",
              borderBottomWidth: 1,
              backgroundColor: "white",
              marginBottom: 12,
              paddingBottom: 12
            }}>
              <FlexCenter gap={12} style={{
                alignItems: "flex-start",
                flex: 1
              }}>
                <SImage source={{ uri: item?.motobikeProduct.image || "" }} />
                <View style={{
                  gap: 8,
                  flex: 1
                }}>
                  <SName numberOfLines={2}>{item?.motobikeProduct.name}</SName>
                  <SPrice>{formatCurrency(item?.price)}</SPrice>
                </View>
              </FlexCenter>
              <SQuantity>x{item?.quantity}</SQuantity>
            </FlexSpaceBetween>
          );
        } else return null;
      })
    );
  }, [orderDetails]);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Đánh giá"} />
      <KeyboardAvoidingView style={{
        flex: 1
      }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
          <View style={{
            paddingHorizontal: 12,
            paddingVertical: 24,
            backgroundColor: "#F4F4F5",
            gap: 20
          }}>
            <View style={{
              gap: 12
            }}>
              <STextBold>Nhân viên sửa chữa</STextBold>
              <FlexCenter gap={24} style={{
                backgroundColor:'white'
              }}>
                <SAvatar source={{ uri:staff?.avatar || "" }} />
                <View style={{
                  flex: 1
                }}>
                  <STextBold numberOfLines={2}>{staff?.fullName}</STextBold>
                  <SName>{`SĐT: ${staff?.phoneNumber}`}</SName>
                </View>
              </FlexCenter>
              <SFeedbackInput
                multiline
                value={contentStaff}
                onChangeText={setContentStaff}
                placeholder={"Hãy chia sẻ nhận xét cho nhân viên sửa chữa!"}
                placeholderTextColor={"#A1A1AA"} />
            </View>
            {orderDetails.length > 0 ? <>
              {listItems}
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
            </> : null}
            <SActionButton onPress={onFeedback}>
              <STextNormal style={{
                color: "white"
              }}>Gửi đánh giá</STextNormal>
            </SActionButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal isVisible={loadingFeedback}/>
    </FullScreenWrapper>
  );
})
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;
const SStarWrapper = styled.View`
  flex-direction: row;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #EDEDED;
  background: #FFF;
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
const SPrice = styled.Text`
  color: #FE3A30;
  font-family: ${Fonts.Regular};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;
const SQuantity = styled.Text`
  color: #231D25;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 500;
`;
const SName = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
const SAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
`;
