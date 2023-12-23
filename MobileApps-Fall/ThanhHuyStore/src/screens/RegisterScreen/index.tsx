import React, { memo, useCallback, useEffect, useState } from "react";
import { FlexCenter } from "@/helper/styles";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { CustomHeader } from "@/components/CustomHeader";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { Alert, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { LoadingModal } from "@/components/LoadingModal";
import { navigateToConfirmScreen } from "@/utils/navigation";
import useAutoToastError from "@/hooks/useAutoToastError";

export const RegisterScreen = memo(function RegisterScreen() {
  const { register, setValue, handleSubmit, control, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      phoneNumber: ""
    }
  });
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");
  const onSubmit = useCallback(async (data: any) => {

    // try {
    //   // auth().settings.appVerificationDisabledForTesting = true;
    //   const confirmation = await auth().signInWithPhoneNumber(data.phoneNumber);
    //   // @ts-ignore
    //   setConfirm(confirmation);
    //   console.log("confirmation", confirmation);
    // } catch (error: any) {
    //   Alert.alert("Error sending code", error.message);
    // }
    navigateToConfirmScreen({
      phoneNumber: data.phoneNumber
    });
  }, []);

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      console.log("user ne", user);
      // navigateToConfirmScreen({
      //   phoneNumber: data.phoneNumber
      // });
    }
  }

  const [{loading,error},confirmCode] = useAsyncFn(async () => {
    if (confirm) {
        console.log("code", code)
        // @ts-ignore
        await confirm.confirm(code);
    }
  }, [code]);
  useAutoToastError(error)

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, []);


  return (
    <FullScreenWrapper>
      <LoadingModal isVisible={loading}/>
      <CustomHeader isBack />
      <SContentContainer>
        <SWrapperView>
          <STitle>Đăng Ký Tài Khoản</STitle>
          <STextGrey>Đăng nhập bằng số điện thoại</STextGrey>
          <STextNormal>Số điện thoại</STextNormal>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <STextInput
                  placeholder="Nhập Số điện thoại"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {/*{error?.message ? <Text style={{*/}
                {/*  color:'red'*/}
                {/*}}>{error.message}</Text>}*/}
              </>

            )}
            name="phoneNumber"
            rules={{ required: "phoneNumber is require" }}
          />
          {confirm ? <>
            <TextInput style={{
              width: '100%',
              height: 50,
              borderWidth: 1,
              borderColor: "#EBEBEB"
            }} value={code} onChangeText={text => setCode(text)} />
            <SButton active onPress={confirmCode}>
              <STextButton>Xác nhận OTP</STextButton>
            </SButton>
          </> : null}
        </SWrapperView>
        <SWrapperView style={{
          alignItems: "center"
        }}>
          <SButton active={isDirty} onPress={handleSubmit(onSubmit)}>
            <STextButton>Tiếp Tục</STextButton>
          </SButton>
          <FlexCenter>
            <STextNormal>Đã có tài khoản? </STextNormal>
            <STextLink> Đăng Nhập </STextLink>
          </FlexCenter>
        </SWrapperView>
      </SContentContainer>
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
  padding: 16px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #FAFAFA;
`;
const SGoogleButton = styled.View`
  display: flex;
  align-items: center;
  border: 1px solid #BD3505;
  background: #FFF;
  padding: 12px;
`;
const SGoogleIcon = styled.Image`
  width: 16px;
  height: 16px;
`;
const SLoginGoogle = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  padding: 12px;
  align-items: center;
  gap: 10px;
  background-color: #BD3505;
`;
