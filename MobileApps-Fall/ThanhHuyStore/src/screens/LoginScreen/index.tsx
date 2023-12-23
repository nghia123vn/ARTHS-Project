import React, { memo } from "react";
import styled from "styled-components/native";
import { IC_LOGO } from "@/assets";
import { useAnimatedSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Fonts } from "@/theme/Fonts";
import { Controller, useForm } from "react-hook-form";
import { CenterBox, FlexSpaceBetween } from "@/helper/styles";
import { ActivityIndicator, Button, Text, TouchableOpacity } from "react-native";
import { navigateToRegisterScreen, replaceToMain } from "@/utils/navigation";
import { ILoginParams, requestLogin } from "@/store/customers/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import SimpleToast from "react-native-simple-toast";
import useAutoToastError from "@/hooks/useAutoToastError";

export const LoginScreen = memo(function LoginScreen() {
  const { aTop } = useAnimatedSafeAreaInsets();
  const animatedPaddingTop = useAnimatedStyle(() => ({
    paddingTop: aTop.value
  }));
  const { register, setValue, handleSubmit, control, reset, formState: { errors, isDirty } } = useForm<ILoginParams>({
    defaultValues: {
      phoneNumber: "",
      password: ""
    }
  });
  const [{ loading,error }, onSubmit] = useAsyncFn(async (params: ILoginParams) => {
    const accessToken = await requestLogin(params);
    if (accessToken) {
      replaceToMain();
    } else SimpleToast.show("Đăng nhập thất bại");
  }, []);
  useAutoToastError(error)

  return (
    <SContainer style={animatedPaddingTop}>
      <SContentContainer>
        <SWrapperView>
          <CenterBox><SLogo source={IC_LOGO} /></CenterBox>
          <STitle>Chào mừng bạn đến với
            Thanh Huy Store</STitle>
          <STextNormal>Số điện thoại</STextNormal>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <STextInput
                  placeholder="Nhập số điện thoại"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error?.message ? <Text>{error.message}</Text> : null}
              </>
            )}
            name="phoneNumber"
            rules={{ required: "Username is require" }}
          />
          <STextNormal>Mật Khẩu</STextNormal>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <STextInput
                placeholder="Nhập Mật Khẩu"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true }}
          />
        </SWrapperView>
        <SWrapperView>
          <SButton active={isDirty} onPress={handleSubmit(onSubmit)}>
            {loading ? <ActivityIndicator /> : <STextButton>Đăng nhập</STextButton>}
          </SButton>
          <FlexSpaceBetween>
            <STextNormal>Quên mật khẩu</STextNormal>
            <TouchableOpacity onPress={() => {
              navigateToRegisterScreen();
            }}>
              <STextLink>Đăng Ký</STextLink>
            </TouchableOpacity>
          </FlexSpaceBetween>
        </SWrapperView>
      </SContentContainer>
    </SContainer>
  );
});
const SContainer = styled(Animated.View)`
  flex: 1;
  background-color: white;
  padding: 24px;
`;
const SWrapperView = styled.View`
  gap: 20px;
`;
const SContentContainer = styled.View`
  gap: 20px;
  flex: 1;
  justify-content: space-between;
  margin-bottom: 20px;
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
  line-height: 20px;
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
  border-radius: 10px;
  background-color: ${p => p.active ? "#BB3204" : "#C4C5C4"};
`;

const SLogo = styled.Image`
  width: 105px;
  height: 54px;
`;
const STextButton = styled.Text`
  color: #FFF;
  text-align: center;
  font-family: ${Fonts.Medium};
  font-size: 14px;
  line-height: 20px; /* 142.857% */
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
  color: black;
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
