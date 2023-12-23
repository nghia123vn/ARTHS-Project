import React, { memo, useCallback, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { TouchableOpacity, View } from "react-native";
import { useAccount } from "@/zustand/account";
import { navigateToEditAccountScreen } from "@/utils/navigation";
import { IC_PENCIL } from "@/assets";
import ImagePicker, { Image, Video } from "react-native-image-crop-picker";
import { uploadAvatar } from "@/zustand/account/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import useAutoToastError from "@/hooks/useAutoToastError";
import { LoadingModal } from "@/components/LoadingModal";


export const DetailAccountScreen = memo(function DetailAccountScreen() {
  const account = useAccount();
  const [selectedImage, setSelectedImage] = useState<Image | Video | null>();
  const [{loading,error},onSelectImage] = useAsyncFn(async () => {
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
  }, []);
  useAutoToastError(error)
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
            <SAvatar source={{ uri: account.avatar }} />
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
              <STextBold>Địa chỉ</STextBold>
              <STextNormal>{account.address}</STextNormal>
            </View>
          </Section>
          <Section>
            <View>
              <STextBold>Loại tài khoản</STextBold>
              <STextNormal>{account.role}</STextNormal>
            </View>
          </Section>
          <SActionButton onPress={navigateToEditAccountScreen}>
            <STextNormal style={{
              color: "#BD3505"
            }}>Chính sửa tài khoản</STextNormal>
          </SActionButton>
        </View>
      </SContainer>
      <LoadingModal isVisible={loading}/>
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
const SIcon = styled.Image`
  width: 40px;
  height: 40px;
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

const SActionButton = styled.TouchableOpacity`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: white;
  border: 1px solid #BD3505;
  margin: 0 12px;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
