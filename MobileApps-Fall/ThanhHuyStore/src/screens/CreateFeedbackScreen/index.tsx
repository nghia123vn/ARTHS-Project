import { memo } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { MotobikeProduct, Staff } from "@/store/order/type";
import { useNavigationParams } from "@/hooks";
import { ItemStaffFeedback } from "@/screens/CreateFeedbackScreen/ItemStaffFeedback";
import { ItemProductFeedback } from "@/screens/CreateFeedbackScreen/ItemProductFeedback";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";

export interface CreateFeedbackScreenParams {
  listProductsIds: string[];
  staff?: Staff;
}

export const CreateFeedbackScreen = memo(function CreateFeedbackScreen() {
  const { listProductsIds, staff } = useNavigationParams<CreateFeedbackScreenParams>();

  return (
    <FullScreenWrapper>
      <CustomHeader title={"Tạo đánh giá"} isBack/>
      <KeyboardAvoidingView style={{
        flex: 1
      }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <SContainer>
          <ScrollView>
            {staff ? <ItemStaffFeedback staff={staff} /> : null}
            {listProductsIds.length > 0 ? <STextNormal>Sản phẩm</STextNormal>:null}
            {listProductsIds.map((item) => {
              if(item ==='')return null;
              else return <ItemProductFeedback key={item} id={item} />
            })}
          </ScrollView>
        </SContainer>
      </KeyboardAvoidingView>
    </FullScreenWrapper>
  );
});
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
  margin-bottom: 12px;
`;
const SContainer = styled.View`
  padding: 8px 12px;
  gap: 12px;
  background-color: #EBEBEB;
`;
