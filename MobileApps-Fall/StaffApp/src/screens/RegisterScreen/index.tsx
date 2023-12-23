import React, { memo, useCallback } from "react";
import { FlexCenter } from "@/helper/styles";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { CustomHeader } from "@/components/CustomHeader";
import { navigateToConfirmScreen } from "@/utils/navigation";
import { FullScreenWrapper } from "@/components/ScreenWrap";

export const RegisterScreen = memo(function RegisterScreen() {
  const { register, setValue, handleSubmit, control, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      phoneNumber: ""
    }
  });
  const onSubmit = useCallback((data: any) => {
    navigateToConfirmScreen({
      phoneNumber: data.phoneNumber
    });
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack />
      <SContentContainer>
        <SWrapperView>
          <STitle>Đăng Ký Tài Khoản</STitle>
          <STextGrey>Đăng nhập bằng email hoặc số điện thoại</STextGrey>
          <STextNormal>Email/ Số điện thoại</STextNormal>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <STextInput
                  placeholder="Nhập Email/ Số điện thoại"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>

            )}
            name="phoneNumber"
            rules={{ required: "phoneNumber is require" }}
          />
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
