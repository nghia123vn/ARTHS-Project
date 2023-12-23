import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { IC_PENCIL, IC_TICK } from "@/assets";
import { useAccount } from "@/zustand/account";
import { CustomHeader } from "@/components/CustomHeader";
import { SelectAddress } from "@/components/SelectAddress";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestUpdateCustomerInfo } from "@/zustand/account/function";
import { LoadingModal } from "@/components/LoadingModal";
import ImagePicker from 'react-native-image-crop-picker';
import useAutoToastError from "@/hooks/useAutoToastError";


export const EditAccountScreen = memo(function EditAccountScreen() {
  const account = useAccount();

  const [customerInfo, setCustomerInfo] = useState<{
    fullName: string,
    gender: string,
    address: string,
    phoneNumber: string,
    oldPassword?: string,
    newPassword?: string
  }>({
    fullName: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });
  const [addressInfo, setAddressInfo] = useState<{
    province: string,
    district: string,
    ward: string,
    address: string
  }>({
    province: "",
    district: "",
    ward: "",
    address: ""
  })

  useEffect(()=>{
    onChangeValue('address',`${addressInfo.address}, ${addressInfo.ward}, ${addressInfo.district}, ${addressInfo.province}` )
  },[addressInfo])

  const onChangeAddress = useCallback((keyName: string, value: string) => {
    setAddressInfo(prev => ({
      ...prev,
      [keyName]: value
    }))
  }, []);

  useEffect(() => {
    if (account) {
      setCustomerInfo({
        fullName: account.fullName,
        gender: account.gender,
        address: account.address,
        phoneNumber: account.phoneNumber,
      });
    }
  }, [account]);

  const onChangeValue = useCallback((keyName: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [keyName]: value
    }));
  }, []);

  const [{loading,error},onUpdate]= useAsyncFn(async ()=>{
    await requestUpdateCustomerInfo(customerInfo,account.id)
  },[customerInfo])

  const defaultValues =  useMemo(()=>{
    if(account.address){
      const arr = account.address.split(", ")
      return {
        province: arr[3],
        district: arr[2],
        ward: arr[1],
        addressDetail: arr[0]
      }
    }
  },[account.address])
  useAutoToastError(error)

  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Chỉnh sửa hồ sơ"} rightComponent={<SButton onPress={onUpdate}>
        <STickIcon source={IC_TICK} />
      </SButton>
      } />
      <KeyboardAvoidingView style={{
        flex: 1
      }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SContainer>
            <SInfoWrapper>
              <SAvatarWrapper>
                <SAvatar source={{ uri: account.avatar }} />
              </SAvatarWrapper>
              <View>
                <STextName>{account.fullName || "Undefined"}</STextName>
                <STextWhite>{`SDT: ${account.phoneNumber}`}</STextWhite>
              </View>
            </SInfoWrapper>
            <Section>
              <STextNormal>Họ và tên</STextNormal>
              <STextInput
                placeholder="Nhập họ và tên"
                onChangeText={(value) => {
                  onChangeValue("fullName", value);
                }}
                value={customerInfo.fullName}
              />
            </Section>
            <Section>
              <STextNormal>Giới tính</STextNormal>
              <SItemWrapper>
                <SCheckBoxWrapper onPress={() => {
                  onChangeValue("gender", "Nam");
                }}>
                  {customerInfo.gender === "Nam" ? <SChecked /> : null}
                </SCheckBoxWrapper>
                <STextNormal>Nam</STextNormal>
              </SItemWrapper>
              <SItemWrapper>
                <SCheckBoxWrapper onPress={() => {
                  onChangeValue("gender", "Nữ");
                }}>
                  {customerInfo.gender === "Nữ" ? <SChecked /> : null}
                </SCheckBoxWrapper>
                <STextNormal>Nữ</STextNormal>
              </SItemWrapper>
            </Section>
            <Section>
              <SelectAddress defaultValue={defaultValues} setValue={onChangeAddress} />
            </Section>
            <Section>
              <STextNormal>Số điện thoại</STextNormal>
              <STextInput
                editable={false}
                placeholder="Nhập số điện thoại"
                onChangeText={(value) => {
                  onChangeValue("phoneNumber", value);
                }}
                value={customerInfo.phoneNumber}
              />
            </Section>
            <Section>
              <STextNormal>Mật khẩu cũ</STextNormal>
              <STextInput
                secureTextEntry
                placeholder="Nhập mật khẩu cũ"
                onChangeText={(value) => {
                  onChangeValue("oldPassword", value);
                }}
                value={customerInfo.oldPassword}
              />
              <STextNormal>Mật khẩu mới</STextNormal>
              <STextInput
                secureTextEntry
                placeholder="Nhập mật khẩu mới"
                onChangeText={(value) => {
                  onChangeValue("newPassword", value);
                }}
                value={customerInfo.newPassword}
              />
            </Section>
            <Section>
              <STextNormal>Loại tài khoản</STextNormal>
              <STextNormal>{account.role.toLocaleUpperCase() || "Undefined"}</STextNormal>
            </Section>
          </SContainer>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal isVisible={loading} />
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #FAFAFA;
  gap: 20px;
`;
const STextNormal = styled.Text`
  color: #090909;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;

const Section = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const SInfoWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background-color: #BD3505;
`;
const SAvatarWrapper = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: gray;
`;
const SAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
const STextWhite = styled(STextNormal)`
  color: #fff;
`;
const STextName = styled(STextNormal)`
  color: #FFF;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const STextInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: "#c4c5c4"
}))`
  display: flex;
  width: 100%;
  padding: 8px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  background-color: white;
`;


const STickIcon = styled.Image`
  width: 16px;
  height: 16px
`;
const SButton = styled.TouchableOpacity.attrs(props => ({
  hitSlop: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8
  }
}))`
`;
const SCheckBoxWrapper = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 2px solid #E2E8F0;
`;
const SChecked = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 6px solid #BD3505;
  background: #FFF;
`;
const SItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  gap: 8px
`;
