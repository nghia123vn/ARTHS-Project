import React, { memo, useCallback, useEffect, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { TouchableOpacity, View } from "react-native";
import { useAccount } from "@/zustand/account";
import { IC_PENCIL } from "@/assets";
import ImagePicker, { Image, Video } from "react-native-image-crop-picker";
import { uploadAvatar } from "@/zustand/account/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestStaffById } from "@/store/staff/function";
import { IStaffDetail } from "@/store/staff/type";


export const DetailAccountScreen = memo(function DetailAccountScreen() {
  const account = useAccount();
  const [selectedImage, setSelectedImage] = useState<Image | Video | null>();
  const [staffDetail,setStaffDetail]=useState<IStaffDetail>({
    accountId: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    avatar: "",
    feedbackStaffs: []
  })
  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    async () =>{
      const data = await requestStaffById(account.id);
      if(data){
        setStaffDetail(data)
      }
    } ,
    [account]
  );

  const onSelectImage = useCallback(async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: false,
        includeBase64: true,
        compressImageQuality: 0.7,
      });
      if(image){
        setSelectedImage(image);
        await uploadAvatar(image);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  }, []);

  useEffect(() => {
    loadFirst().then();
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Thông tin tài khoản"} />
      <SContainer>
        <SHeader />
        <View style={{
          gap: 8,
          marginTop: -40,
          width: "100%",
          alignItems: "center",
          paddingBottom: 12,
          borderBottomColor: "#E0E2E7",
          borderBottomWidth: 1
        }}>
          <SAvatarWrapper>
            <SAvatar source={{ uri: account.avatar || selectedImage?.path }} />
            <TouchableOpacity onPress={onSelectImage} style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#fff",
              borderRadius: 12,
            }}>
              <SImage source={IC_PENCIL}/>
            </TouchableOpacity>
          </SAvatarWrapper>
          <STextNormal>{account.fullName}</STextNormal>
        </View>
        <View style={{
          width: "100%",
          paddingHorizontal: 24,
          marginTop: 20,
          gap: 20
        }}>
          <Section>
            <View>
              <STextBold>Số điện thoại</STextBold>
              <STextNormal>{account.phoneNumber}</STextNormal>
            </View>
          </Section>
          <Section>
            <View>
              <STextBold>Giới tính</STextBold>
              <STextNormal>{account.gender}</STextNormal>
            </View>
          </Section>
          <Section>
            <View>
              <STextBold>Trạng thái</STextBold>
              <STextNormal>{account.status}</STextNormal>
            </View>
          </Section>
          <Section>
            <View>
              <STextBold>Loại tài khoản</STextBold>
              <STextNormal>{account.role}</STextNormal>
            </View>
          </Section>
          <Section>
            <View style={{
              width: "100%",
            }}>
              <STextBold>{staffDetail.feedbackStaffs.length === 0 ? "Chưa có đánh giá từ khách hàng" :"Các phản hồi từ khách hàng"}</STextBold>
              {staffDetail.feedbackStaffs.length > 0 ? <STextNormal>{`${staffDetail.feedbackStaffs.length} lượt đánh giá`}</STextNormal> :null}
              {staffDetail.feedbackStaffs.map((feedback)=>{
                return (
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                    borderRadius:12,
                    width:"100%",
                    borderColor:"#000",
                    padding:12,
                    borderWidth:1,
                    marginBottom:12
                  }}>
                    <SAvatarCustomer source={{ uri: feedback.customer.avatar }} />
                    <View style={{
                      marginLeft: 8,
                      flex:1,
                    }}>
                      <View style={{
                        borderBottomWidth:1,
                        borderColor:"#EBEBEB",
                        paddingBottom:8,
                        marginBottom:12,
                        width:"100%"
                      }}>
                        <STextNormal>{feedback.customer.fullName}</STextNormal>
                      </View>
                      <STextNormal>{feedback.content}</STextNormal>
                    </View>
                  </View>
                )
              })}
            </View>
          </Section>
        </View>
      </SContainer>
    </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background: white;
  align-items: center;
  padding: 20px 8px;
`;
const SAvatarWrapper = styled.View`
  width: 82px;
  height: 82px;
  border-radius: 41px;
  background-color: #E5E5E5;
`;
const SAvatar = styled.Image`
  width: 82px;
  height: 82px;
  border-radius: 41px;
`;
const SHeader = styled.View`
  background-color: #BD3505;
  height: 80px;
  width: 100%;
  border-radius: 4px;
`;
const Section = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 12px;
`;
const STextNormal = styled.Text`
  color: #333843;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px; /* 150% */
  letter-spacing: 0.08px;
`;
const STextBold = styled(STextNormal)`
  font-weight: 700;
`;
const SAvatarCustomer = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
`;

const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
