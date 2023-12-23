import React, { memo } from "react";
import { FlexCenter } from "@/helper/styles";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { CustomHeader } from "@/components/CustomHeader";
import { navigateToLoginScreen } from "@/utils/navigation";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { useNavigationParams } from "@/hooks";
import { IRegisterParams, requestRegister } from "@/store/staff/function";
import SimpleToast from "react-native-simple-toast";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { ActivityIndicator } from "react-native";

export interface ConfirmScreenParams {
  phoneNumber: string,
}

export const ConfirmScreen = memo(function ConfirmScreen() {
  const { phoneNumber } = useNavigationParams<ConfirmScreenParams>();
  const [gender, setGender] = React.useState<"Nam" | "Nữ">("Nam");
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
      gender: "Nam"
    }
  });


  const [{ loading, error: firstError }, onRegister] = useAsyncFn(
    async (data: any) => {
      const _data = await requestRegister(data);
      if (_data) {
        SimpleToast.show("Đăng ký thành công");
        navigateToLoginScreen();
      } else SimpleToast.show("Đăng ký thất bại");
    },
    []
  );


  return (
    <FullScreenWrapper>
      <CustomHeader isBack />
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
                {/*{error?.message ? <Text style={{*/}
                {/*  color:'red'*/}
                {/*}}>{error.message}</Text>}*/}
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
          <STextNormal>Giới tính</STextNormal>
          <SItemWrapper>
            <SCheckBoxWrapper onPress={() => {
              setValue("gender", "Nam");
              setGender("Nam")
            }}>
              {gender === "Nam" ? <SChecked /> : null}
            </SCheckBoxWrapper>
            <STextNormal>Nam</STextNormal>
          </SItemWrapper>
          <SItemWrapper>
            <SCheckBoxWrapper onPress={() => {
              setValue("gender", "Nữ");
              setGender("Nữ")
            }}>
              {gender === "Nữ" ? <SChecked /> : null}
            </SCheckBoxWrapper>
            <STextNormal>Nữ</STextNormal>
          </SItemWrapper>
        </SWrapperView>
        <SWrapperView style={{
          alignItems: "center"
        }}>
          <SButton active={isDirty} onPress={handleSubmit(onRegister)}>
            {loading ? <ActivityIndicator /> : <STextButton>Đăng kí</STextButton>}
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
  gap:8px
`;
