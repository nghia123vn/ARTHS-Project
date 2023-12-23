import React, { memo, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import SimpleToast from "react-native-simple-toast";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { Staff } from "@/store/order/type";
import { FlexCenter } from "@/helper/styles";
import { View } from "react-native";
import { requestEditFeedbackStaff, requestFeedbackStaff } from "@/store/order/function";
import { useAccount } from "@/zustand/account";
import { LoadingModal } from "@/components/LoadingModal";
import { useStaff } from "@/store/staff";
import { requestProduct } from "@/store/product/function";
import useAutoToastError from "@/hooks/useAutoToastError";
import { requestStaffById } from "@/store/staff/function";
import { IStaffDetail } from "@/store/staff/type";

export const ItemStaffFeedback = memo(function ItemStaffFeedback({ staff }: {
  staff: Staff
}) {
  const account=useAccount()
  const [staffDetail,setStaffDetail]=useState<IStaffDetail>({
    accountId: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    avatar: "",
    feedbackStaffs: []
  })
  const [feedbackId, setfeedbackId] = useState('');
  const [content, setContent] = useState("");
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    async () =>{
      const data = await requestStaffById(staff.accountId);
      if(data){
        setStaffDetail(data)
      }
    } ,
    [staff]
  );
  useAutoToastError(firstError);

  const [{ loading: loadingFeedback, error: errorFeedback }, onFeedback] = useAsyncFn(async () => {
    if(feedbackId){
      if(staffDetail){
        const data= await requestEditFeedbackStaff({
          staffId: staffDetail.accountId,
          customerId: account.id,
          title: "Đánh giá nhân viên",
          content
        },feedbackId);
        if(data){
          setStaffDetail(prev=>({
            ...prev,
            feedbackStaffs: [...prev.feedbackStaffs,data]
          }))
        }
      }
    }else {
      if(staffDetail){
        const data= await requestFeedbackStaff({
          staffId: staffDetail.accountId,
          customerId: account.id,
          title: "Đánh giá nhân viên",
          content
        });
        if(data){
          setStaffDetail(prev=>({
            ...prev,
            feedbackStaffs: [...prev.feedbackStaffs,data]
          }))
        }
      }
    }
    SimpleToast.show("Gửi đánh giá thành công");
  }, [content,account]);

  useEffect(()=>{
    loadFirst().then();
  },[])

  useEffect(()=>{
    if(staffDetail){
      staffDetail.feedbackStaffs.map((feedback)=>{
        if(feedback.customer.accountId === account.id){
          setContent(feedback.content)
          setfeedbackId(feedback.id)
        }
        return;
      })
    }
  },[staffDetail,account])

  useAutoToastError(errorFeedback)


  return (
    <SContainer>
      <View style={{
        gap: 12
      }}>
        <STextBold>Nhân viên</STextBold>
        <FlexCenter gap={24} style={{
          backgroundColor: "white",
          borderRadius:12,
          borderWidth:1,
          borderColor:"#000",
          paddingVertical:8,
          paddingHorizontal:12
        }}>
          <SAvatar source={{ uri: staff?.avatar || "" }} />
          <View style={{
            flex: 1
          }}>
            <STextBold numberOfLines={2}>{staff?.fullName}</STextBold>
            <SName>{`SĐT: ${staff?.phoneNumber}`}</SName>
          </View>
        </FlexCenter>
        <SFeedbackInput
          multiline
          value={content}
          onChangeText={setContent}
          placeholder={"Hãy chia sẻ nhận xét cho nhân viên sửa chữa!"}
          placeholderTextColor={"#A1A1AA"} />
      </View>

      <SActionButton onPress={onFeedback}>
        <STextNormal style={{
          color: "white"
        }}>{feedbackId ? "Chỉnh sửa đánh giá" : "Gửi đánh giá"}</STextNormal>
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

const SFeedbackInput = styled.TextInput`
  border-radius: 12px;
  border: 2px solid #F4F4F5;
  background: #FFF;
  min-height: 120px;
  padding: 0 12px;
`;

const SActionButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
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
  font-family: ${Fonts.Bold};
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
