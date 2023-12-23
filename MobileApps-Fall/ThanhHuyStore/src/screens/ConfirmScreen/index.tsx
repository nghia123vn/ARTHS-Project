import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlexCenter } from "@/helper/styles";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { CustomHeader } from "@/components/CustomHeader";
import { navigateToLoginScreen, navigateToMain } from "@/utils/navigation";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { useNavigationParams } from "@/hooks";
import { IRegisterParams, requestRegister } from "@/store/customers/function";
import SimpleToast from "react-native-simple-toast";
import SelectDropdown from "react-native-select-dropdown";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SelectAddress } from "@/components/SelectAddress";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { LoadingModal } from "@/components/LoadingModal";
import useAutoToastError from "@/hooks/useAutoToastError";


export interface ConfirmScreenParams {
  phoneNumber: string,
}

export const ConfirmScreen = memo(function ConfirmScreen() {
  const { phoneNumber } = useNavigationParams<ConfirmScreenParams>();
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
  const {

    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty }
  } = useForm<IRegisterParams>({
    defaultValues: {
      phoneNumber: phoneNumber,
      password: "",
      fullName: "",
      gender: "",
      address: ""
    }
  });

  useEffect(()=>{
    setValue('address',`${addressInfo.address}, ${addressInfo.ward}, ${addressInfo.district}, ${addressInfo.province}` )
  },[addressInfo])

  const onChangeValue = useCallback((keyName: string, value: string) => {
    setAddressInfo(prev => ({
      ...prev,
      [keyName]: value
    }))
  }, []);

  const [{loading,error},onSubmit] = useAsyncFn(async (data: IRegisterParams)=>{
    await requestRegister(data)
  },[])
  useAutoToastError(error)

  // const onSubmit = useCallback(async (data: IRegisterParams) => {
  //   const _data = await requestRegister(data);
  //   if (_data) {
  //     SimpleToast.show("Đăng ký thành công");
  //     navigateToLoginScreen();
  //   } else SimpleToast.show("Đăng ký thất bại");
  // }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack />
      <KeyboardAvoidingView style={{
        flex:1
      }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <SContentContainer>

            <SWrapperView>
              <STitle>Thông Tin & Mật Khẩu</STitle>
              <STextGrey>Hoàn thành dữ liệu cuối cùng sau đây để vào ứng dụng ThanhHuyStore</STextGrey>
              <STextNormal>Họ và tên</STextNormal>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <STextInput
                      placeholder="Nhập họ và tên"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>

                )}
                name="fullName"
                rules={{ required: "Name is require" }}
              />
              <STextNormal>Mật khẩu</STextNormal>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <STextInput
                      placeholder="Nhập Mật Khẩu"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                    />
                  </>

                )}
                name="password"
                rules={{ required: "Name is require" }}
              />
              <SelectAddress setValue={onChangeValue}/>
            </SWrapperView>
            <SWrapperView style={{
              alignItems: "center",
              marginTop:24
            }}>
              <SButton active={isDirty} onPress={handleSubmit(onSubmit)}>
                <STextButton>Đăng kí</STextButton>
              </SButton>
              <FlexCenter>
                <STextNormal>Đã có tài khoản? </STextNormal>
                <STextLink> Đăng Nhập </STextLink>
              </FlexCenter>
            </SWrapperView>
      </SContentContainer>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingModal isVisible={loading}/>
    </FullScreenWrapper>
  );
});

const SWrapperView = styled.View`
  gap: 20px;
`;
const SContentContainer = styled.View`
  gap: 20px;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 24px;

`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 25px;
  font-weight: 700;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
`;
const STextLink = styled(STextNormal)`
  color: #BB3204;
`;
const SButton = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: ${p => p.active ? "#BB3204" : "#C4C5C4"};
`;

const STextGrey = styled(STextNormal)`
  color: #838589;
`;
const STextButton = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: ${Fonts.Medium};
  font-size: 14px;
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
`;
const CustomDropdown = styled(SelectDropdown)`
  width: 100%;
`;
